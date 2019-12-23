// Import Mongoose and connect to the DB.
var mongoose = require("mongoose");

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
  // Find all students.
  Task.find(function(err, tasks) {
    // Set the response header to indicate JSON content
    // and return the array of task data.
    response.setHeader("Content-Type", "application/json");
    response.send(tasks);
    console.log(tasks.length);
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

app.get("/newtask", function(request, response) {
  // UNFiniSHED
  // TODO: FIx
  var title = request.query.title;
  var desc = request.query.desc;

  // Create a new student instance with the posted data.
  var myStudent = new Student({name: studentName,
  course: course});
  myStudent.save(function(err) {
  // Error handling here.
  });
  response.send("Student successfully saved");
});


app.listen(9000, function()
{
  console.log("Listening on 9000...");
})
