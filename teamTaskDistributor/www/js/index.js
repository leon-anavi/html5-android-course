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
        document.getElementById('button').onclick = this.handleButton;
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      document.getElementById('loading').setAttribute('style', 'display:none;');
      document.getElementById('info').setAttribute('style', 'display:block;');
    },

    // Handle button click
    handleButton : function() {
      // Save name to local storage
      $.ajax({ url: "http://anavi.org/example/",
              //Type POST or GET
              type: "POST",
              //Alternative URL for GET: http://anavi.org/example/?name=John&age=20
              data: { name: "Gosho Karatista", age: "25" },
              //Success callback
              success: function(result){
                var person = JSON.parse(result);
                // Check if the property exists in the object
                var name = (person.hasOwnProperty(name)) ? person.name : '';
                // Alternative way to check if property exists in object
                var age = (age in person) ? person.age : 0;
                $("#text").html("The age of "+person.name+" is "+person.age+" years.");
              },
              //Error callback
              error: function(xhr){
                alert("Error: " + xhr.status + " " + xhr.statusText);
              }

      });
    }
};

app.initialize();
