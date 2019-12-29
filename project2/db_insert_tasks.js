var mongoose = require("mongoose");
var expressTasks = require("./express-tasks");

var uri = "mongodb+srv://user:user@adencluster-knyii.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true});

for (i = 0; i < 10; i++)
{
  var task = new expressTasks.Task({
    "id": i,
    "title": "Task " + i.toString(),
    "desc": "This is the description for task " + i.toString(),
    "due": new Date("2020-01-12"),
    "priority": 5
  });

  var intitialToDoTasks = [0, 1, 2, 3];
  var initialDoingTasks = [4, 5, 6, 7];
  var initialDoneTasks = [8, 9];

  console.log(intitialToDoTasks);
  console.log(initialDoingTasks);
  console.log(initialDoneTasks);

  task.save();
}

for (var i = 0; i < 3; i++)
{
  var columnTitle;
  var arrayOfTasks;

  if(i == 0)
  {
    columnTitle = "To-Do";
    arrayOfTasks = intitialToDoTasks;
  }
  else if(i == 1)
  {
    columnTitle = "Doing";
    arrayOfTasks = initialDoingTasks;
  }
  else if(i == 2)
  {
    columnTitle = "Done";
    arrayOfTasks = initialDoneTasks;
  }

  var column = new expressTasks.Column({
    "id": i,
    "title": columnTitle,
    "position": i,
    "tasks": arrayOfTasks
  });

  column.save();
}
