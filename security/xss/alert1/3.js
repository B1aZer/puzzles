The code below generates HTML in an unsafe way. Prove it by calling alert(1).

function escape(s) {
  s = JSON.stringify(s);
  return '<script>console.log(' + s + ');</script>';
}

''</script><script> alert(1) //
