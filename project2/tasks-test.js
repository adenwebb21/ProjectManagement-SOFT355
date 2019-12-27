var highestId = 0;

$(function()
{
    $.get("http://localhost:9000/listtasks", {}, function(res) {
      let data = res;
      let tasks = [];

      for (var i = 0; i < data.length; i++) {
        tasks[i] = data[i];
        var divId = "div" + tasks[i].id;
        $("#test").append("<div id=" + divId + ">");
        $("#" + divId).append("<p>" + "ID: " + tasks[i].id);
        $("#" + divId).append("<p>" + "Title: " + tasks[i].title);
        $("#" + divId).append("<p>" + "Description: " + tasks[i].desc);
        $("#" + divId).append("<p>" + "Priority: " + tasks[i].priority);
        $("#" + divId).append("<p>" + "Due Date: " + tasks[i].due);
        $("#" + divId).append('<button name="removebtn" id="' + tasks[i].id + '" type="button">Remove</button><br><br>');

        if(i > highestId)
        {
          highestId = i;
        }
      }
  });
});

$(document).ready(function()
{
    $("#newtask").click(function()
    {
      var valid = true;

      if($('#title').val() == "" || $('#desc').val() == "" || $('#due').val() == "" || $('input[name=priority]').val() == "")
      {
        valid = false;
      }

      if(valid)
      {
        var newTitle = $('#title').val();
        var newDesc = $('#desc').val();
        var newDue = $('#due').val();
        var newPriority = $('input[name=priority]').val();

        $.get("http://localhost:9000/newtask/" + newTitle + "/" + newDesc + "/" + newDue + "/" + newPriority + "/", {}, function(res) {
          let data = res;

          var divId = "div" + data.id;
          $("#test").append("<div id=" + divId + ">");
          $("#" + divId).append("<p>" + "ID: " + data.id);
          $("#" + divId).append("<p>" + "Title: " + data.title);
          $("#" + divId).append("<p>" + "Description: " + data.desc);
          $("#" + divId).append("<p>" + "Priority: " + data.priority);
          $("#" + divId).append("<p>" + "Due Date: " + data.due);
          $("#" + divId).append('<button name="removebtn" id="' + data.id + '" type="button">Remove</button><br><br>');
        });

        highestId++;
      }
      else {
        alert("incomplete fields");
      }
    });
});

$(document).on('click', 'button[name ="removebtn"]', function()
{
  var id = $(this).attr('id');
  $.get("http://localhost:9000/removetask/:" + id, {}, function(res) {});
  $("#div" + id).remove();

});
