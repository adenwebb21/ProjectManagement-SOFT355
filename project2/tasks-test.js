$(function()
{
    $.get("http://localhost:9000/listtasks", {}, function(res) {
      let data = res;
      let tasks = [];

      for (var i = 0; i < data.length; i++) {
        tasks[i] = data[i];
        $("#test").append("<p>" + tasks[i].title + "<p/><br>");
        $("#test").append("<p>" + tasks[i].desc + "<p/><br>");
        $("#test").append("<p>" + tasks[i].priority + "<p/><br>");
        $("#test").append("<p>" + tasks[i].due + "<p/><br>");
      }
  });
});

$(document).ready(function()
{
    $("#newtask").click(function()
    {
      var newTitle = $('#title').val();
      var newDesc = $('#desc').val();

      $.get("http://localhost:9000/newtask/" + newTitle + "/" + newDesc + "/", {}, function(res) {
        let data = res;

        $("#test").append("<p>" + data.title + "<p/><br>");
        $("#test").append("<p>" + data.desc + "<p/><br>");
        $("#test").append("<p>" + data.priority + "<p/><br>");
        $("#test").append("<p>" + data.due + "<p/><br>");
      });
    });
});
