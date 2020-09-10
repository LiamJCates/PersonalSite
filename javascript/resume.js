function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" tab-border", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " tab-border";
}

function openBottomTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("bottomTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("bottomTablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" tab-border", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " tab-border";
}



var acc = document.getElementsByClassName("accordion");
var i;
/* TODO ternary */
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    panel.style.display =
      ((panel.style.display === "block")? "none" : "block");

    panel.style.maxHeight =
      ((panel.style.maxHeight)? null : panel.scrollHeight + "px");

  });
}
