var defer = function() {
  return new Deferred();
};

function Promise() {
  this.$$state = { status: 0 };
}

Promise.prototype = {
  then: function(onFulfilled, onRejected, progressBack) {
    var result = new Deferred();

    this.$$state.pending = this.$$state.pending || [];
    this.$$state.pending.push([result, onFulfilled, onRejected, progressBack]);
    if (this.$$state.status > 0) scheduleProcessQueue(this.$$state);

    return result.promise;
  },

  "catch": function(callback) {
    return this.then(null, callback);
  },

  "finally": function(callback, progressBack) {
    return this.then(function(value) {
      return handleCallback(value, true, callback);
    }, function(error) {
      return handleCallback(error, false, callback);
    }, progressBack);
  }
};

//Faster, more basic than angular.bind http://jsperf.com/angular-bind-vs-custom-vs-native
function simpleBind(context, fn) {
  return function(value) {
    fn.call(context, value);
  };
}

function processQueue(state) {
  var fn, promise, pending;

  pending = state.pending;
  state.processScheduled = false;
  state.pending = undefined;
  for (var i = 0, ii = pending.length; i < ii; ++i) {
    promise = pending[i][0];
    fn = pending[i][state.status];
    try {
      if (isFunction(fn)) {
        promise.resolve(fn(state.value));
      } else if (state.status === 1) {
        promise.resolve(state.value);
      } else {
        promise.reject(state.value);
      }
    } catch (e) {
      promise.reject(e);
      exceptionHandler(e);
    }
  }
}

function scheduleProcessQueue(state) {
  if (state.processScheduled || !state.pending) return;
  state.processScheduled = true;
  nextTick(function() { processQueue(state); });
}

function Deferred() {
  this.promise = new Promise();
  //Necessary to support unbound execution :/
  this.resolve = simpleBind(this, this.resolve);
  this.reject = simpleBind(this, this.reject);
  this.notify = simpleBind(this, this.notify);
}

Deferred.prototype = {
  resolve: function(val) {
    if (this.promise.$$state.status) return;
    if (val === this.promise) {
      this.$$reject($qMinErr(
        'qcycle',
        "Expected promise to be resolved with value other than itself '{0}'",
        val));
    } else {
      this.$$resolve(val);
    }

  },

  $$resolve: function(val) {
    var then, fns;

    fns = callOnce(this, this.$$resolve, this.$$reject);
    try {
      if ((isObject(val) || isFunction(val))) then = val && val.then;
      if (isFunction(then)) {
        this.promise.$$state.status = -1;
        then.call(val, fns[0], fns[1], this.notify);
      } else {
        this.promise.$$state.value = val;
        this.promise.$$state.status = 1;
        scheduleProcessQueue(this.promise.$$state);
      }
    } catch (e) {
      fns[1](e);
      exceptionHandler(e);
    }
  },

  reject: function(reason) {
    if (this.promise.$$state.status) return;
    this.$$reject(reason);
  },

  $$reject: function(reason) {
    this.promise.$$state.value = reason;
    this.promise.$$state.status = 2;
    scheduleProcessQueue(this.promise.$$state);
  },

  notify: function(progress) {
    var callbacks = this.promise.$$state.pending;

    if ((this.promise.$$state.status <= 0) && callbacks && callbacks.length) {
      nextTick(function() {
        var callback, result;
        for (var i = 0, ii = callbacks.length; i < ii; i++) {
          result = callbacks[i][0];
          callback = callbacks[i][3];
          try {
            result.notify(isFunction(callback) ? callback(progress) : progress);
          } catch (e) {
            exceptionHandler(e);
          }
        }
      });
    }
  }
};
