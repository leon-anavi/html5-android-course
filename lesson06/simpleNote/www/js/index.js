window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

var app = {

    fileObject: null,

    fileEntry: null,

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
        document.getElementById('button').onclick = this.save;
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.getElementById('loading').setAttribute('style', 'display:none;');
        document.getElementById('info').setAttribute('style', 'display:block;');

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, app.gotFS, app.fail);
    },

    gotFS: function(fileSystem) {
      fileSystem.root.getFile("note.txt", {create: true, exclusive: false}, app.gotFileEntry, app.fail);
    },

    gotFileEntry: function(fileEntry) {
      app.fileEntry = fileEntry;
      //Read the content of the file
      fileEntry.file(app.gotFile, app.fail);
    },

    gotFile: function(file){
      app.readAsText(file);
    },

    readAsText: function(file) {
      var reader = new FileReader();
      reader.onloadend = function(evt) {
        console.log("content of the file read.");
        //Load the content of the file into the text area
        document.getElementById('note').value = evt.target.result;
      };
      reader.readAsText(file);
    },

    gotFileWriter: function(writer) {
      writer.onwriteend = function(evt) {
        console.log("File saved.");
      };
      writer.write(document.getElementById('note').value);
    },

    fail: function(error) {
      console.log(JSON.stringify(error));
      console.log(error.code);
    },

    // Handle button click
    save: function() {
      app.fileEntry.createWriter(app.gotFileWriter, app.fail);
    }
};

app.initialize();
