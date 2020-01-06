var highestId = 0;
var board;
var allTasks = [];
var data = [];

$(function()
{
  GetAllTasks();
  $.each(allTasks, function(index)
  {
    $.getJSON("http://localhost:9000/listcolumns/bytask/" + res[index].id).done(function(column)
    {
      var tempTask = res[index];
      columnName = column.title;
      console.log("Column name is: " + columnName);
      var divId = "div" + tempTask.id;

      $("#" + columnName).append("<div class='task' id=" + divId + ">");
      $("#" + divId).append("<p>" + "ID: " + tempTask.id);
      $("#" + divId).append("<p>" + "Title: " + tempTask.title);
      $("#" + divId).append("<p>" + "Description: " + tempTask.desc);
      $("#" + divId).append("<p>" + "Priority: " + tempTask.priority);
      $("#" + divId).append("<p>" + "Due Date: " + tempTask.due);
      $("#" + divId).append('<button name="removebtn" id="' + tempTask.id + '" type="button">Remove</button><br><br>');
      $("#" + divId).append('<button name="movebtn_r" id="' + tempTask.id + '" type="button">Move Right</button><br><br>');
      $("#" + divId).append('<button name="movebtn_l" id="' + tempTask.id + '" type="button">Move Left</button><br><br>');
    });
  });
});

function GetAllTasks()
{
  $.getJSON("http://localhost:9000/listtasks", {}, function(tasks){
    allTasks = tasks;
    console.log("Retrieved all tasks" + allTasks.length);
  });
}

$(document).ready(function()
{
    $("#submitCode").click(function()
    {
      var valid = true;

      if($('#code').val() == "")
      {
        valid = false;
      }

      if(valid)
      {
        var code = $('#code').val();

        $.get("http://localhost:9000/getboard/" + code + "/", {}, function(res) {
          board = res;
          window.location.href = "tasks-test.html";
        });
      }
      else {
        alert("incomplete fields");
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
          $("#To-Do").prepend("<div class='task' id=" + divId + ">");
          $("#" + divId).append("<p>" + "ID: " + data.id);
          $("#" + divId).append("<p>" + "Title: " + data.title);
          $("#" + divId).append("<p>" + "Description: " + data.desc);
          $("#" + divId).append("<p>" + "Priority: " + data.priority);
          $("#" + divId).append("<p>" + "Due Date: " + data.due);
          $("#" + divId).append('<button name="removebtn" id="' + data.id + '" type="button">Remove</button><br><br>');
          $("#" + divId).append('<button name="movebtn_r" id="' + data.id + '" type="button">Move Right</button><br><br>');
          $("#" + divId).append('<button name="movebtn_l" id="' + data.id + '" type="button">Move Left</button><br><br>');
        });
      }
      else {
        alert("incomplete fields");
      }
    });
});

$(document).on('click', 'button[name ="removebtn"]', function()
{
  var id = $(this).attr('id');
  $.get("http://localhost:9000/removetaskfromcol/:" + id, {}, function(res) {});
  $.get("http://localhost:9000/removetask/:" + id, {}, function(res) {});
  $("#div" + id).remove();

});

$(document).on('click', 'button[name ="movebtn_r"]', function()
{
  var id = $(this).attr('id');

  $.getJSON("http://localhost:9000/increment_column/:" + id).done(function(newColumn) {

    if(newColumn != "Task not moved")
    {
      console.log("The new column is " + newColumn.title);

      $.get("http://localhost:9000/listtasks/" + id).done(function(task) {

        if(task != "Invalid task!")
        {
          console.log("The new task is " + task.id);

          var divId = "div" + task.id;
          $("#" + newColumn.title).prepend("<div class='task' id=" + divId + ">");
          $("#" + divId).append("<p>" + "ID: " + task.id);
          $("#" + divId).append("<p>" + "Title: " + task.title);
          $("#" + divId).append("<p>" + "Description: " + task.desc);
          $("#" + divId).append("<p>" + "Priority: " + task.priority);
          $("#" + divId).append("<p>" + "Due Date: " + task.due);
          $("#" + divId).append('<button name="removebtn" id="' + task.id + '" type="button">Remove</button><br><br>');
          $("#" + divId).append('<button name="movebtn_r" id="' + task.id + '" type="button">Move Right</button><br><br>');
          $("#" + divId).append('<button name="movebtn_l" id="' + task.id + '" type="button">Move Left</button><br><br>');

          $("#" + divId).fadeOut('normal', function(){
              $("#" + divId).fadeIn();
          });
        }
        else {
          console.log("Task ID was not valid");
        }

      });

      $("#div" + id).remove();
    }
    else {

    }
  });
});

$(document).on('click', 'button[name ="movebtn_l"]', function()
{
  var id = $(this).attr('id');
  $.getJSON("http://localhost:9000/decrement_column/:" + id).done(function(newColumn) {

    if(newColumn != "Task not moved")
    {
      console.log("The new column is " + newColumn.title);

      $.get("http://localhost:9000/listtasks/" + id).done(function(task) {

        if(task != "Invalid task!")
        {
          console.log("The new task is " + task.id);

          var divId = "div" + task.id;
          $("#" + newColumn.title).prepend("<div class='task' id=" + divId + ">");
          $("#" + divId).append("<p>" + "ID: " + task.id);
          $("#" + divId).append("<p>" + "Title: " + task.title);
          $("#" + divId).append("<p>" + "Description: " + task.desc);
          $("#" + divId).append("<p>" + "Priority: " + task.priority);
          $("#" + divId).append("<p>" + "Due Date: " + task.due);
          $("#" + divId).append('<button name="removebtn" id="' + task.id + '" type="button">Remove</button><br><br>');
          $("#" + divId).append('<button name="movebtn_r" id="' + task.id + '" type="button">Move Right</button><br><br>');
          $("#" + divId).append('<button name="movebtn_l" id="' + task.id + '" type="button">Move Left</button><br><br>');

          $("#" + divId).fadeOut('normal', function(){
              $("#" + divId).fadeIn();
          });
        }
        else {
          console.log("Task ID was not valid");
        }

      });

      $("#div" + id).remove();
    }
    else {

    }
  });
});
