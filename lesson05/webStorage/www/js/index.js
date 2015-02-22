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
        document.getElementById('button').onclick = this.saveData;
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.getElementById('loading').setAttribute('style', 'display:none;');
        document.getElementById('info').setAttribute('style', 'display:block;');

        app.loadData();
    },

    loadData : function() {
      var text = "Name: "+localStorage.getItem('name')+"</br>\n";
      text += "Age: "+sessionStorage.getItem('age')+"</br>\n";
      document.getElementById('text').innerHTML = text;
    },

    // Handle button click
    saveData : function() {
      // Save name to local storage
      localStorage.setItem('name', document.getElementById('name').value);
      // Save age to session storage
      sessionStorage.setItem('age', document.getElementById('age').value);
      app.loadData();
    }
};

app.initialize();
