var app = {

    backButtonClicked : false,

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
        document.addEventListener('backbutton', this.onBackButton, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },

    // Handle back button
    onBackButton : function() {
      if (false === app.backButtonClicked) {
        navigator.notification.alert(
          // message
          'Click again to exit!',
          // callback function
          function() {
            console.log('The user has clicked the back button and dismissed the dialog.');
          },
          // Title
          'Information',
          // Button title
          'OK, I will click again'
        );
        app.backButtonClicked = true;
      }
      else {
        app.backButtonClicked = false;
        navigator.app.exitApp();
      }
    }
};

app.initialize();
