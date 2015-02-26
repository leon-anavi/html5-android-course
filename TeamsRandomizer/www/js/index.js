var app = {

    tasks: [],

    players: ["a", "b", "c", "d", "e", "f", "g"],

    numberOfTasks: 10,

    dataChanged: false,

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
        document.getElementById('button').onclick = this.generate;
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      document.getElementById('loading').setAttribute('style', 'display:none;');
      document.getElementById('info').setAttribute('style', 'display:block;');

      app.loadData();
      if (true === app.dataChanged) {
        alert('Configuration has been changed. Please regenerate.');
      }
      else {
        app.showTeams();
      }
    },

    // Load data from local storage
    // Return false if configurations have been changed
    loadData: function() {
      if(typeof(Storage) === "undefined") {
        app.generateTasks();
        return;
      }
      app.dataChanged = false;
      var players = app.loadArray("players");
      if (players.length !== app.players.length) {
        app.dataChanged = true;
      }
      else {
        app.players = players;
      }
      var tasks = app.loadArray("tasks");
      if (app.numberOfTasks !== tasks.length) {
        app.generateTasks();
        app.dataChanged = true;
      }
      else {
        app.tasks = tasks;
      }
    },

    // Load array for local storage depending the provided key
    loadArray: function(storageKey) {
      var data = JSON.parse(localStorage.getItem(storageKey));
      if (false === Array.isArray(data)) {
        data = [];
      }
      return data;
    },

    // Shuffle an array
    shuffle: function(data) {
      var currentIndex = data.length;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        var temporaryValue = data[currentIndex];
        data[currentIndex] = data[randomIndex];
        data[randomIndex] = temporaryValue;
      }

      return data;
    },

    // Clear table by removing all rows except the table header
    clearTable: function(table) {
      while (0 < table.rows.length){
        table.deleteRow(-1);
      }
    },

    // Generate and shuffle tasks
    generateTasks: function() {
      if (0 === app.tasks.length) {
        for (var taskIter=1;taskIter<=app.numberOfTasks;taskIter++) {
          app.tasks.push(taskIter);
        }
      }
      app.shuffle(app.tasks);
    },

    addTableHeading: function(table) {
      var row = table.insertRow(0);
      row.insertCell(0).innerHTML = "Team";
      row.insertCell(1).innerHTML = "Members";
      row.insertCell(2).innerHTML = "Task";
    },

    // Display teams and tasks
    showTeams: function() {
      var table = document.getElementById("teams");
      app.clearTable(table);
      app.addTableHeading(table);

      var nTaskId = 0;
      var maxTeamsNumber = Math.floor(app.players.length/2);
      for (var player = 0; player < app.players.length; player+=2) {
        // Insert new row at the end of the table
        var row = table.insertRow(nTaskId+1);
        // Insert cell for a serial number of the team
        var cellTeam = row.insertCell(0);
        var teamNumber = nTaskId+1;
        cellTeam.innerHTML = teamNumber;
        // Insert cell for team members
        var cellMembers = row.insertCell(1);
        // Insert cell for a task
        var cellTask = row.insertCell(2);
        cellTask.innerHTML = app.tasks[nTaskId];
        // Fill in the cell with team members
        var secondPlayerIndex = player+1;
        var members = app.players[player] + ', ' + app.players[secondPlayerIndex];
        if (maxTeamsNumber === teamNumber) {
          var lastIndex = app.players.length-1;
          if (lastIndex > secondPlayerIndex) {
            members += ', '+ app.players[lastIndex];
          }
          cellMembers.innerHTML = members;
          break;
        }
        cellMembers.innerHTML = members;

        nTaskId += 1;
      }
    },

    //generate teams and tasks
    generate: function(){
      if ( (false === app.dataChanged) &&
           (false === confirm("Save data will be lost. Continue?")) ) {
        return;
      }
      else if (true === app.dataChanged) {
        app.dataChanged = false;
      }

      app.players = app.shuffle(app.players);
      app.generateTasks();

      if(typeof(Storage) !== "undefined") {
        localStorage.setItem("players", JSON.stringify(app.players));
        localStorage.setItem("tasks", JSON.stringify(app.tasks));
      }

      app.showTeams();
    },
};

app.initialize();
