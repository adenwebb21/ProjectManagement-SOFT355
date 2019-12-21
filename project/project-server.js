var express = require("express");
var db = require("./db");

var app = express();

//app.use(express.static("resources"));
//app.get("/task/:id", function(request, response)
//{

//  db.getTask(request.params.id).then(function(task)
//  {
//    response.send(task.title + " " + task.desc);
//  });
//});

app.get("/task/:id", function(request, response)
{
  db.getTasks().then(function(tasks)
  {
    console.log(tasks);
  });
});

app.get("/sayhello/", sayHello);


app.listen(9000, function()
{
  console.log("Listening on 9000...");
})


function sayHello(req, res) {
  res.send("Hello world, from Express");
}
