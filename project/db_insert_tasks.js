var mongoose = require("mongoose");
var schemas = require("./schemas");

var uri = "mongodb+srv://user:user@adencluster-knyii.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true});

for (i = 0; i < 10; i++)
{
  var task = new schemas.Task({
    "id": i,
    "title": "Task " + i.toString(),
    "desc": "This is the description for task " + i.toString(),
    "due": 31,
    "priority": 5
  });

  task.save();
}
