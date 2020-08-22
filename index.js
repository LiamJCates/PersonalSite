/* Screen Naviagtion */

// ------------- VARIABLES ------------- //
var ancherList = ["welcome-section", "projects", "contact"];
var currentPosition = null;
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 500; //Amount of time for which slide is "locked"


// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(event) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = event.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -event.deltaY;
  } else {
    //Set delta for all other browsers
    delta = event.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      switch (currentPosition) {
            case null:
            case ancherList[0]:
                currentPosition = ancherList[1];
                break;
            case ancherList[1]:
                currentPosition = ancherList[2];
                break;
            case ancherList[2]:
                currentPosition = ancherList[0];
                break;
        }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      switch (currentPosition) {
            case null:
            case ancherList[0]:
                currentPosition = ancherList[2];
                break;
            case ancherList[1]:
                currentPosition = ancherList[0];
                break;
            case ancherList[2]:
                currentPosition = ancherList[1];
                break;
        }
      slideDurationTimeout(slideDurationSetting);
    }

	document.getElementById(currentPosition).scrollIntoView({
        behavior: 'smooth'
    });
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);


function closeNav(){
  document.getElementById('settings').style.display='none';
  document.getElementById('close').style.display='none';
  document.getElementById('open').style.display='block';
}
function openNav(){
  document.getElementById('settings').style.display='block';
  document.getElementById('open').style.display='none';
  document.getElementById('close').style.display='block';
}
