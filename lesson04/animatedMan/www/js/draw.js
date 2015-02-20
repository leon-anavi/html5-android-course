var posX = 0;
var goLeft = true;

// Init function
function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

// Handle deviceready event
function onDeviceReady() {
  // Now it is safe to start the animation
  window.requestAnimationFrame(draw);
}

// Calculate offset of the position
function calculatePosition() {
  if (true === goLeft) {
    return posX+2;
  }
  return posX-2;
}

// Draw the Sun, the Earth and its orbit
function draw() {
  var canvas = document.getElementById('draw');
  var ctx = canvas.getContext('2d');

  //Resize canvas to full screen
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  // Clear the canvas
  ctx.clearRect(0,0,400,400);

  // The vertical center of the screen
  var screenCenterY = Math.round(canvas.height/2);
  // Position of the man corresponding to the background
  // the height of the man is 120
  var posY = screenCenterY-120;

  // Blue background
  ctx.fillStyle = "#3366FF";
  ctx.fillRect(0, 0, canvas.width, screenCenterY);

  // Green background
  ctx.fillStyle = "#006600";
  ctx.fillRect(0, screenCenterY, canvas.width, screenCenterY);


  // Head
  ctx.beginPath();
  ctx.arc(posX+20,posY+20,20,0,2*Math.PI);
  ctx.strokeStyle = '#000000';
  ctx.stroke();
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

  // Body
  ctx.moveTo(posX+20,posY+40);
  ctx.lineTo(posX+20,posY+80);
  ctx.strokeStyle = '#000000';
  ctx.stroke();

  //Left leg
  ctx.moveTo(posX+20,posY+80);
  ctx.lineTo(posX+5,posY+120);
  ctx.strokeStyle = '#000000';
  ctx.stroke();


  //Right leg
  ctx.moveTo(posX+20,posY+80);
  ctx.lineTo(posX+35,posY+120);
  ctx.strokeStyle = '#000000';
  ctx.stroke();

  //Left hand
  ctx.moveTo(posX+20,posY+40);
  ctx.lineTo(posX+5,posY+70);
  ctx.strokeStyle = '#000000';
  ctx.stroke();

  //Right hand
  ctx.moveTo(posX+20,posY+40);
  ctx.lineTo(posX+35,posY+70);
  ctx.strokeStyle = '#000000';
  ctx.stroke();

  // Indirect recursion through callback to draw the next frame
  window.requestAnimationFrame(draw);

  posX = calculatePosition();
  if ( (canvas.width-40) < posX) {
    goLeft = false;
  }
  else if (0 >= posX) {
    goLeft = true;
  }
}
