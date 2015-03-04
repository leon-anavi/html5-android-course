/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		
		var options = { frequency: 100 };  
		var watchID = navigator.accelerometer.watchAcceleration(accelerometerSuccess,
                                                       accelerometerError,
                                                       options);
													   
		requestAnimFrame();											   
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

var sqSize = 60;
var posX = 0;
var posY = 0;
var offsetX = 0;

app.initialize();

function accelerometerError() {
	alert('onError!');
}

function accelerometerSuccess(acceleration) {
	
	switch(window.orientation) 
    {  
      case -90:
      case 90:
        // landscape
		offsetX = acceleration.y;
        break; 
      default:
        // portrait
		offsetX = acceleration.x;
        break; 
    }
}

function requestAnimFrame() {
	var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;
 
	animFrame(draw);
}

function draw() {
  var canvas = document.getElementById('draw');
  var ctx = canvas.getContext('2d');

  //Resize canvas to full screen
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  // Clear the canvas
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  // Center vertically
  posY = canvas.height * 0.5 - sqSize * 0.5;
  
  // Green
  ctx.fillStyle = "#006600";
  ctx.fillRect(posX, posY, sqSize, sqSize);

  requestAnimFrame();
  
  posX -= offsetX;
  
  if (posX < 0) {
	posX = 0;
  }
  else if ( (canvas.width-sqSize) < posX) {
	posX = canvas.width-sqSize;
  }
  /*
  if (posY < 0) {
	posY = 0;
  }
  else if ( (canvas.height-sqSize) < posY) {
	posX = canvas.height-sqSize;
  }
  */
}