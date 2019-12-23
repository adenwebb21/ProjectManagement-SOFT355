// Import Mongoose and connect to the DB.
var mongoose = require("mongoose");
//var insertTasks = require("./db_insert_tasks");

var uri = "mongodb+srv://user:user@adencluster-knyii.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true});

var Task = mongoose.model("Task", {id: Number, title: String, desc: String, due: Date, priority: Number});

module.exports.Task = Task;

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

app.get("/newtask/:title/:desc", function(request, response) {

  var id = 0;

  Task.find(function(err, tasks) {
    var numOfTasks = tasks.length;
    var tempId = numOfTasks + 1;
    id = tempId;
  });

  var title = request.params.title;
  var desc = request.params.desc;

  insertCustomTask(id, title, desc);

  var task = new Task({
    "id": id,
    "title": title,
    "desc": desc,
    "due": new Date("2020-01-12"),
    "priority": 5
  });

  task.save();

  console.log("current ID: " + id);
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

app.listen(9000, function()
{
  console.log("Listening on 9000...");
})
