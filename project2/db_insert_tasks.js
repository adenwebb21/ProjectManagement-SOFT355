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

  task.save();
}
