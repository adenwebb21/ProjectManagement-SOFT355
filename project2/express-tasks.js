// Import Mongoose and connect to the DB.
var mongoose = require("mongoose");
//var insertTasks = require("./db_insert_tasks");

var uri = "mongodb+srv://user:user@adencluster-knyii.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

var Task = mongoose.model("Task", {id: Number, title: String, desc: String, due: Date, priority: Number});
var Column = mongoose.model("Column", {id: Number, title: String, position: Number, tasks: [Number]});

module.exports.Task = Task;
module.exports.Column = Column;

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
      response.send("Invalid task!");
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

app.get("/movetasktoright/:id/", function(request, response) {

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
        var idx = column.tasks ? column.tasks.indexOf(tempId) : -1;
        console.log("IDX: " + idx);
        column.tasks.splice(idx, 1);

        column.tasks.splice(0, 0, tempId);

        response.setHeader("Content-Type", "application/json");
        response.send("Task moved");

        column.save();

        console.log("removed task");
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
