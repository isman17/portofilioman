var link = document.getElementById('link');
function bar() {
  link.style.width = "300px";
  // link.style.zIndex = "99px";
  link.style.transition = ".5s";
  document.body.style.backgroundColor = "rgba(0,0,0,.7)";
}
function xbar() {
  link.style.width = "0";
  // link.style.zIndex = "-99";
  link.style.transition = ".5s";
  document.body.style.backgroundColor = "rgba(0,0,0,0)";
}