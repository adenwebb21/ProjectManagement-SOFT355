// Import Mongoose and connect to the DB.
var mongoose = require("mongoose");
//var insertTasks = require("./db_insert_tasks");

var uri = "mongodb+srv://user:user@adencluster-knyii.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

var Task = mongoose.model("Task", {id: Number, title: String, desc: String, due: Date, priority: Number});
var Column = mongoose.model("Column", {id: Number, title: String, position: Number, tasks: [Number]});
var Board = mongoose.model("Board", {id: Number, title: String, code: Number, columns: [Number]});

module.exports.Task = Task;
module.exports.Column = Column;
module.exports.Board = Board;

var id = 0;

// Import Express and initialise the application.
express = require("express");
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/forbidden", function(request, response) {
  response.Status = "403 Forbidden";
});

app.get("/getboard/:passcode", function(request, response) {
  console.log("The requested passcode is: " + request.params.passcode);
  var query = Board.findOne({"code": request.params.passcode});
  var promise = query.exec();

  promise.then(function(board) {
    if(board != null)
    {
      console.log("Found board: " + board);
      response.setHeader("Content-Type", "application/json");
      response.send(board);
    }
    else {
      response.send("no board found");
    }

  });
});

app.get("/createboard/:title/:passcode/:columns", function(request, response) {
  var query = Board.find();

  var promise = query.exec();

  promise.then(function (boards)
  {
    var numOfBoards = boards.length;
    var tempId = numOfBoards;

    var title = request.params.title;
    var code = request.params.passcode;
    var columns = request.params.columns;

    var board = new Board({
      "id": tempId,
      "title": title,
      "code": code,
      "columns": columns
    });

    var promise = board.save();

    promise.then(function (doc)
    {
      Board.findOne({"id": tempId}, function(err, board) {
        if(board == null)
        {
          response.send("Invalid board!");
        }
        else {
          response.setHeader("Content-Type", "application/json");
          response.send(board);
        }
      });
    });
  });
});

app.get("/createcolumn/:title/", function(request, response) {
  var query = Column.find();

  var promise = query.exec();

  promise.then(function (columns)
  {
    var numOfColumns = columns.length;
    var tempId = numOfColumns;

    var title = request.params.title;
    var position = numOfColumns;
    var tasks = [];

    var column = new Column({
      "id": tempId,
      "title": title,
      "position": position,
      "tasks": tasks
    });

    var promise = column.save();

    promise.then(function (doc)
    {
      Column.findOne({"id": tempId}, function(err, column) {
        if(column == null)
        {
          response.send("Invalid column!");
        }
        else {
          response.setHeader("Content-Type", "application/json");
          response.send(column);
        }
      });
    });
  });
});

app.get("/listtasks", function(request, response) {
  // Find all tasks.
  Task.find(function(err, tasks) {
    // Set the response header to indicate JSON content
    // and return the array of task data.
    response.setHeader("Content-Type", "application/json");
    response.send(tasks);
  });
});

app.get("/listcolumns", function(request, response) {
  // Find all columns.
  Column.find(function(err, columns) {
    // Set the response header to indicate JSON content
    // and return the array of column data.
    response.setHeader("Content-Type", "application/json");
    response.send(columns);
  });
});

app.get("/listtasks/:id", function(request, response) {
  Task.findOne({"id": request.params.id}, function(err, task) {
    console.log("Requested task was " + request.params.id);
    if(task == null)
    {
      response.send("Invalid task!");
    }
    else {
      response.setHeader("Content-Type", "application/json");
      response.send(task);
    }

  });
});

app.get("/listcolumns/:id", function(request, response) {
  Column.findOne({"id": request.params.id}, function(err, column) {
    if(column == null)
    {
      response.send("Invalid column!");
    }
    else {
      response.setHeader("Content-Type", "application/json");
      response.send(column);
    }

  });
});

app.get("/listcolumns/bytask/:id", function(request, response) {

  var query = Column.findOne({"tasks": request.params.id});
  var promise = query.exec();

  promise.then(function(column)
  {
    if(column == null)
    {
      response.send("Invalid task!");
    }
    else {
      response.setHeader("Content-Type", "application/json");
      response.send(column);
    }
  })
});

app.get("/newtask/:title/:desc/:due/:priority", function(request, response) {

  var query = Task.find();

  var promise = query.exec();

  promise.then(function (tasks)
  {
    var numOfTasks = tasks.length;
    var tempId = numOfTasks;
    id = tempId;

    console.log("Task ID: " + id);

    var title = request.params.title;
    var desc = request.params.desc;
    var due = request.params.due;
    var priority = request.params.priority;

    var task = new Task({
      "id": id,
      "title": title,
      "desc": desc,
      "due": due,
      "priority": priority
    });

    var promise = task.save();

    promise.then(function (doc)
    {
      console.log("Searching for ID: " + id);
      Task.findOne({"id": id}, function(err, task) {
        if(task == null)
        {
          response.send("Invalid task!");
          console.log("invalid task");
        }
        else {
          response.setHeader("Content-Type", "application/json");
          response.send(task);
          console.log("sent correct data");
        }
      });
    });
  });
});

app.get("/newtask_withID/:id/:title/:desc/:due/:priority", function(request, response) {

    var id = request.params.id;
    var title = request.params.title;
    var desc = request.params.desc;
    var due = request.params.due;
    var priority = request.params.priority;

    var task = new Task({
      "id": id,
      "title": title,
      "desc": desc,
      "due": due,
      "priority": priority
    });

    var promise = task.save();

    promise.then(function (doc)
    {
      console.log("Searching for ID: " + id);
      Task.findOne({"id": id}, function(err, task) {
        if(task == null)
        {
          response.send("Invalid task!");
          console.log("invalid task");
        }
        else {
          response.setHeader("Content-Type", "application/json");
          response.send(task);
          console.log("sent correct data");
        }
      });
    });
  });

app.get("/increment_column/:id/", function(request, response) {

  var tempId = request.params.id
  tempId = tempId.substring(1, tempId.length);

  console.log("Searching for task to move: " + tempId);
  Column.findOne({"tasks": tempId}, function(err, column) {
    if(column == null)
    {
      response.send("Invalid column!");
      console.log("invalid column");
    }
    else
    {
      if(column.id < 2)
      {
        console.log("Current Column ID: " + column.id);

        var idx = column.tasks ? column.tasks.indexOf(tempId) : -1;

        console.log("Index of task within column: " + idx);

        column.tasks.splice(idx, 1);

        console.log("Removed task from index " + idx);

        column.save();

        var nextColumn = column.id + 1;

        var query = Column.findOne({id: nextColumn});
        var promise = query.exec();

        promise.then(function(newCol)
        {
          newCol.tasks.splice(0, 0, tempId);

          console.log("Added task " + tempId + " to column: " + newCol.title);

          response.setHeader("Content-Type", "application/json");
          response.send(newCol);

          newCol.save();
        });
      }
      else {
        response.setHeader("Content-Type", "application/json");
        response.send("Task not moved");

        console.log("task not moved");
      }


    }
  });
});

app.get("/decrement_column/:id/", function(request, response) {

  var tempId = request.params.id
  tempId = tempId.substring(1, tempId.length);

  console.log("Searching for task to move: " + tempId);
  Column.findOne({"tasks": tempId}, function(err, column) {
    if(column == null)
    {
      response.send("Invalid column!");
      console.log("invalid column");
    }
    else
    {
      if(column.id > 0)
      {
        console.log("Current Column ID: " + column.id);

        var idx = column.tasks ? column.tasks.indexOf(tempId) : -1;

        console.log("Index of task within column: " + idx);

        column.tasks.splice(idx, 1);

        console.log("Removed task from index " + idx);

        column.save();

        var nextColumn = column.id - 1;

        var query = Column.findOne({id: nextColumn});
        var promise = query.exec();

        promise.then(function(newCol)
        {
          newCol.tasks.splice(0, 0, tempId);

          console.log("Added task " + tempId + " to column: " + newCol.title);

          response.setHeader("Content-Type", "application/json");
          response.send(newCol);

          newCol.save();
        });
      }
      else {
        response.setHeader("Content-Type", "application/json");
        response.send("Task not moved");

        console.log("task not moved");
      }


    }
  });
});

app.get("/removetask/:id/", function(request, response) {

  var tempId = request.params.id
  tempId = tempId.substring(1, tempId.length);

  console.log("Searching for task to remove: " + tempId);
  Task.findOne({"id": tempId}, function(err, task) {
    if(task == null)
    {
      response.send("Invalid task!");
      console.log("invalid task");
    }
    else {
      response.setHeader("Content-Type", "application/json");
      response.send("Task removed");
      task.remove();

      console.log("removed task");
    }
  });
});

app.get("/removetaskfromcol/:id/", function(request, response) {

  var tempId = request.params.id
  tempId = tempId.substring(1, tempId.length);


  console.log("Searching for task to remove: " + tempId);
  Column.findOne({"tasks": tempId}, function(err, column) {
    if(column == null)
    {
      response.send("Invalid task!");
      console.log("invalid task");
    }
    else {
      var idx = column.tasks ? column.tasks.indexOf(tempId) : -1;
      console.log("IDX: " + idx);
      column.tasks.splice(idx, 1);

      response.setHeader("Content-Type", "application/json");
      response.send("Task removed");

      column.save();

      console.log("removed task");
    }
  });
});

app.listen(9000, function()
{
  console.log("Listening on 9000...");
})
