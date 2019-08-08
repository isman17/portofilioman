var link = document.getElementById('link');
function bar() {
  link.style.width = "300px";
  link.style.transition = ".5s";
  document.body.style.backgroundColor = "rgba(0,0,0,.5)";
  document.body.style.zIndex = "-1";
  link.style.zIndex = "1";
}
function xbar() {
  link.style.width = "0";
  link.style.transition = ".5s";
  link.style.zIndex = "-1";
  document.body.style.zIndex = "1";
  document.body.style.backgroundColor = "rgba(0,0,0,0)";
}