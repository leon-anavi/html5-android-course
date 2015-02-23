var pause = false;
var angle = 0;

//init function
function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
}
function chooseAnimationFrameMethod(){
    if ( !window.requestAnimationFrame ) {
      return window.webkitRequestAnimationFrame(draw)
      || window.mozRequestAnimationFrame(draw)
      || window.msRequestAnimationFrame(draw)
      || function(callback) { return setTimeout(callback, 1000 / 60); };
    }else{
      return !window.requestAnimationFrame(draw)
    }
}

//handle deviceready event
function onDeviceReady() {
  // Now it is safe to start the animation
  chooseAnimationFrameMethod();
}

//handle pause event
function onPause() {
  pause = true;
}

//handle resume event
function onResume() {
  pause = false;
  chooseAnimationFrameMethod();
}

//Draw the Sun, the Earth and its orbit
function draw() {
  if (true === pause) {
    return;
  }
  var ctx = document.getElementById('draw').getContext('2d');
  //Clear the canvas
  ctx.clearRect(0,0,300,300);

  //Draw the orbit of the earth
  ctx.beginPath();
  ctx.arc(150,150,100,0,Math.PI*2,false);
  ctx.strokeStyle = "#006699";
  ctx.stroke();

  //Draw the Sun
  ctx.beginPath();
  ctx.arc(150,150,50,0,2*Math.PI);
  ctx.fillStyle = "#FFCC00";
  ctx.fill();

  //Save the entire default state of the canvas
  ctx.save();

  //Move the canvas and its origin x horizontally and y vertically
  //to the center of our drawing area.
  ctx.translate(150,150);

  angle = angle + 0.01;
  if (6.28 < angle) {
    angle = 0;
  }
  ctx.rotate(angle);
  //Move to place the Earth at its orbit
  ctx.translate(112,0);

  //Draw the Earth
  ctx.beginPath();
  ctx.arc(-12,-12,24,0,2*Math.PI);
  ctx.fillStyle = "#006699";
  ctx.fill();

  //Restore the most recently saved canvas state.
  ctx.restore();

  //Indirect recursion through callback to draw the next frame
  chooseAnimationFrameMethod();
}
