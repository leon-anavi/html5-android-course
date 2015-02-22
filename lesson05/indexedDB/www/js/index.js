window.indexedDB = window.indexedDB || window.webkitIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

var app = {

    db: null,

    version: 1,

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

        // Open indexedDB
        var request = window.indexedDB.open("mobileDB", app.version);
        request.onerror = function(event) {
          console.log("error");
        };
        request.onsuccess = function(event) {
          app.db = event.target.result;
          app.loadData();
        };

        request.onupgradeneeded = function(event) {
          app.db = event.target.result;
          if (1 === app.version) {
            var objectStore = app.db.createObjectStore("info", { keyPath: "key" });
            objectStore.createIndex("key", "key", { unique: true });

            objectStore.transaction.oncomplete = function(event) {
              var objectStore = app.db.transaction("info", "readwrite").objectStore("info");
              objectStore.add({
                key: 'obj1',
                name: '',
                age: ''
              });
            };
          }
        }
    },

    loadData : function() {
      var objectStore = app.db.transaction("info").objectStore("info");
      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        while (cursor) {
          if ('obj1' === cursor.value.key) {
            var text = "Name: "+cursor.value.name+"</br>\n";
            text += "Age: "+cursor.value.age+"</br>\n";
            document.getElementById('text').innerHTML = text;
            break;
          }
          cursor.continue();
        }
      };
    },

    // Handle button click
    saveData : function() {

      // Update the name and age of the existing object
      var transaction = app.db.transaction(["info"], "readwrite");
      var request = transaction.objectStore("info").put({
        key: 'obj1',
        name: document.getElementById('name').value,
        age: document.getElementById('age').value
      });

      request.onsuccess = function(event) {
        console.log("Data saved.");
      };

      request.onerror = function(event) {
        alert("Unable to save data.");
      }

      transaction.oncomplete = function(event) {
        //Load data when the transaction for saving in completed
        app.loadData();
      }
    }
};

app.initialize();
