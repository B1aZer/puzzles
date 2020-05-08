The code below generates HTML in an unsafe way. Prove it by calling alert(1).

function escape(s) {
  s = s.replace(/"/g, '\\"');
  return '<script>console.log("' + s + '");</script>';
}

\");alert(1);//
