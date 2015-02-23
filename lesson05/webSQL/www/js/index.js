var app = {
    // Database handler
    db: null,
    // Database table
    table: 'info',
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

    openDatabase: function() {
      var dbVersion = 1.0;
      var dbName = "mobileTestDB";
      var dbDesc = "Database for a simple mobie application";
      var dbSize = 1024 * 1024; //1MB
      app.db = openDatabase(dbName, dbVersion, dbDesc, dbSize);
    },

    retrieveData: function() {
      app.db.transaction(function (transaction) {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS "+app.table+" (id INTEGER PRIMARY KEY, name TEXT, age INT)");
        transaction.executeSql("SELECT name, age FROM "+app.table+" WHERE id = ?", [1],
        function (sqlTransaction, sqlResult) {
          if (0 < sqlResult.rows.length) {
            var text = "Name: "+sqlResult.rows.item(0).name+"</br>\n";
            text += "Age: "+sqlResult.rows.item(0).age+"</br>\n";
            document.getElementById('text').innerHTML = text;
          }
        });
      });
    },

    loadData : function() {
      try {
        app.openDatabase();
        app.retrieveData();
      }
      catch(err) {
        alert('Unable to load information');
        console.log('Unable to load data: '+err.message);
      }
    },

    // Handle button click
    saveData : function() {
      try {
        if (null == app.db) {
          throw {message:"Database has not been opened."};
        }

        app.db.transaction(function (transaction) {
          var name = document.getElementById('name').value;
          var age = parseInt(document.getElementById('age').value);
          //Ensure that the input is converted to an integer
          if (isNaN(age)) {
            age = 0;
          }
          transaction.executeSql("REPLACE INTO "+app.table+"(id, name, age) VALUES (?, ?, ?)", [1, name, age]);
        });
      }
      catch(err) {
        console.log('Unable to save data: '+err.message);
        alert('Unable to save data!');
      }
      app.loadData();
    }
};

app.initialize();
