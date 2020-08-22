"use strict";

/**
* Written by Dillon https://codepen.io/Dillo
*
* Inspired in very large part by Alex Andrix's work on Codepen
* https://codepen.io/alexandrix/pen/jgyWww
* @author Alex Andrix <alex@alexandrix.com>
* @since 2019
*/




var nbEddies = 2;
var nbParticles = 1000; // number of particlez
var lifeTime = 100; // average lifetime of particlez

/* foci slider */
var foci_slider = document.getElementById("foci-range");
var foci_output = document.getElementById("foci");
foci_output.innerHTML = foci_slider.value;

foci_slider.oninput = function() {
  foci_output.innerHTML = this.value;
  nbEddies = this.value;
}

/* particles slider */
var particles_slider = document.getElementById("particles-range");
var particles_output = document.getElementById("particles");
particles_output.innerHTML = particles_slider.value;

particles_slider.oninput = function() {
  particles_output.innerHTML = this.value;
  nbParticles = this.value;
}

/* lifetime slider */
var lifetime_slider = document.getElementById("lifetime-range");
var lifetime_output = document.getElementById("lifetime");
lifetime_output.innerHTML = lifetime_slider.value;

lifetime_slider.oninput = function() {
  lifetime_output.innerHTML = this.value;
  lifeTime = this.value;
}

function sliderUpdate(){
  foci_output.innerHTML = nbEddies;
  particles_output.innerHTML = nbParticles;
  lifetime_output.innerHTML = lifeTime;
}
sliderUpdate();

let canv, ctx;   // canvas and drawing context
let dimx, dimy;  // size of canvas

let eddies;      // array of eddies
let particlez;   // array of particlez

let requestID;   // ID provided by window.requestAnimationFrame();
let hueShift;

/* shortcuts for Math */

const mrandom = Math.random; // see above alternative function for reproductible results
const mfloor = Math.floor;
const mround = Math.round;
const mceil = Math.ceil;
const mabs = Math.abs;
const mmin = Math.min;
const mmax = Math.max;

const mPI = Math.PI;
const mPIS2 = Math.PI / 2;
const m2PI = Math.PI * 2;
const msin = Math.sin;
const mcos = Math.cos;
const matan2 = Math.atan2;
const mexp = Math.exp;

const mhypot = Math.hypot;
const msqrt = Math.sqrt;

//-----------------------------------------------------------------------------
// miscellaneous functions
//-----------------------------------------------------------------------------

function alea (min, max) {
// random number [min..max[ . If no max is provided, [0..min[

if (typeof max == 'undefined') return min * mrandom();
return min + (max - min) * mrandom();
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function intAlea (min, max) {
// random integer number [min..max[ . If no max is provided, [0..min[

if (typeof max == 'undefined') {
  max = min; min = 0;
}
return mfloor(min + (max - min) * mrandom());
} // intAlea

//------------------------------------------------------------------------
function createEddy () {

return {
x: alea (dimx),
y: alea (dimy),
/*
x: dimx / 2,
y: dimy / 2,
*/
//   coeffR: 0.0,        // coefficient for radial velocity
coeffR: 0.001 * (alea(0.7, 1.3)),        // coefficient for radial velocity
radius: 150 + alea(-50, 50),          // radius where angular velocity is max
coeffA1: 10000 * alea(0.8, 12),         // coefficient in exponent for angular velocity
coeffA2: 0.01 * alea(0.8, 1.2),       // multiplying coefficient for angular velocity
dir: (mrandom() > 0.5) ? 1 : -1 // direction of rotation
}

} // createEddy

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function createEddies() {
eddies = [];                  // create empty array;
for (let k = 0; k < nbEddies; ++k) {
eddies.push(createEddy());
} // for k
} // createEddies

//------------------------------------------------------------------------
function createParticle() {

return {
x: alea (-100, dimx + 100),
y: alea (-100, dimy + 100),
sat:  `${intAlea(50, 101)}%`,
light: `${intAlea(30, 80)}%`,
TTL: alea(lifeTime * 0.8, lifeTime * 1.2) // time to live
}
} // createParticle
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function createParticles() {
particlez = [];                  // create empty array;
for (let k = 0; k < nbParticles; ++k) {
particlez.push(createParticle());
} // for k
particlez.forEach (part => {
part.TTL = intAlea(lifeTime); // to avoid too many deaths / births in firts generations
});
} // createParticles

//------------------------------------------------------------------------
function move() {

let part, prev, dx, dy, s, c, r, rv, av, deltar;
let mindeltar;

for (let k = 0; k < nbParticles; ++k) {
part = particlez[k];
// death and re-birth
if (part.TTL <= 0) {
  part = createParticle();
  particlez[k] = part;
}

prev = {x: part.x, y: part.y}; // position before this move
mindeltar = 10000; // used to evaluate hue

eddies.forEach ((eddy, ke) => {
  dx = prev.x - eddy.x;
  dy = prev.y - eddy.y;
  r = mhypot(dx, dy);    // distance particle - centre of the eddy

  if (r < 0.001) r = 0.001;
  s = dy / r; // sine of angle
  c = dx / r; // cosine of angle

// angular velocity
  deltar = r - eddy.radius;
  av = eddy.coeffA2 * mexp (- deltar * deltar / eddy.coeffA1) * eddy.dir;
// radial velocity
  rv = - deltar * eddy.coeffR;

  part.x += rv * c -  av * r * s;
  part.y += rv * s +  av * r * c;

}) // (loop on eddies)
--part.TTL; // decrease time to live
// draw it
let speed =mhypot (prev.x - part.x, prev.y - part.y) ;
let hue = mmin (speed * 100, 300); // hue based on speed
hue = (hue + hueShift) % 360;
ctx.beginPath();
ctx.moveTo (prev.x, prev.y);
ctx.lineTo (part.x, part.y);
ctx.strokeStyle = `hsl(${hue},${part.sat},${part.light})`;
ctx.stroke();

} // for k (loop on particlez)
} // move

//------------------------------------------------------------------------

//------------------------------------------------------------------------

function startOver() {

// canvas dimensions

dimx = document.getElementById("contact").offsetWidth;
dimy = document.getElementById("contact").offsetHeight;

canv.width = dimx;
canv.height = dimy;

ctx.lineWidth = 1.5;
ctx.imageSmoothingEnabled = false;

hueShift = intAlea(360);
createEddies();
createParticles();

if (typeof requestID == 'number') window.cancelAnimationFrame(requestID);
(function animate () {
move();
requestID = window.requestAnimationFrame(animate);
})();

} // startOver

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function clickCanvas() {
window.addEventListener('resize',startOver);
document.getElementById("msg1").style.display = "none";
document.getElementById("msg2").style.display = "none";
document.getElementById("close").style.marginBottom = "0px";
startOver();
}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
// beginning of execution

{
canv = document.createElement('canvas');
canv.style.position = "absolute";
canv.addEventListener('click',clickCanvas);
document.getElementById("contact").insertAdjacentElement('afterbegin', canv)
ctx = canv.getContext('2d');
} // canvas creation

document.getElementById("contact").addEventListener('click',clickCanvas);
