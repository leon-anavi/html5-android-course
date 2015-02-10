//init function
function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

//handle deviceready event
function onDeviceReady() {
  // Now it is safe to start the animation
  window.requestAnimationFrame(draw);
}

//Draw the Sun, the Earth and its orbit
function draw() {
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

  var time = new Date();
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
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
  window.requestAnimationFrame(draw);
}
