var highestId = 0;
var board = null;
var allTasks = [];
var currentColumns = [];
var data = [];

$(function()
{
  GetAllTasks();
});

function PopulateFromBoard()
{
  console.log("POPULATING FROM BOARD");
  $.each(currentColumns, function(columnIndex){
    $.each(currentColumns[columnIndex].tasks, function(taskIndex){

      var tempTask;

      $.getJSON("http://localhost:9000/listtasks/" + currentColumns[columnIndex].tasks[taskIndex]).done(function(task){
        tempTask = task;
        console.log(tempTask);

        var columnName = currentColumns[columnIndex].title;

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
}

function GetAllTasks()
{
  $.getJSON("http://localhost:9000/listtasks", {}, function(tasks){
    allTasks = tasks;
    console.log("Retrieved all tasks" + allTasks.length);
  });
}

function GetColumns(columns)
{
  $.each(columns, function(i){
    $.get("http://localhost:9000/listcolumns/" + columns[i] + "/").done(function(col) {
      currentColumns[i] = col;
      console.log(currentColumns[i]);
    });
  });

  setTimeout(function(){
    PopulateFromBoard();
  }, 1000);
}

function SubmitCode(code)
{
  $.get("http://localhost:9000/getboard/" + code + "/").done(function(res) {
    if(res != "no board found")
    {
      board = res;
      GetColumns(res.columns);
    }
    else {
      alert("Invalid board code");
    }
  });
}

function AddColumn(col)
{
  $(".Columns").append("<div class='Container'><h1>" + col.title + "</h1><div class='Column' id='" + col.title + "'>");
  currentColumns.push(col);
  console.log(currentColumns);
}

function ClearBoard()
{
  $("div.task").remove();
}

$(document).ready(function()
{
  $("#newColumn").click(function()
  {
    var valid = true;

    if($('#columnTitle').val() == "")
    {
      valid = false;
    }

    if(valid)
    {
      var title = $('#columnTitle').val();

      $.get("http://localhost:9000/createColumn/" + title + "/").done(function(res) {
        if(res != "Invalid column!")
        {
          AddColumn(res);
          // TODO: add new column to board
        }
        else {
          console.log("Column was invalid!!");
        }
      });
    }
    else {
      alert("incomplete fields");
    }
  });
});

$(document).ready(function()
{
    $("#submitCode").click(function()
    {
      var valid = true;

      if(board != null && $('#code').val() == board.code.toString())
      {
        alert("Already in this board!");
      }
      else {

        if($('#code').val() == "")
        {
          valid = false;
        }

        if(valid)
        {
          var code = $('#code').val();

          $.get("http://localhost:9000/getboard/" + code + "/").done(function(res) {
            if(res != "no board found")
            {
              ClearBoard();
              board = res;
              GetColumns(res.columns);
            }
            else {
              alert("Invalid board code");
            }

          });
        }
        else {
          alert("incomplete fields");
        }
      }
    });
});

$(document).ready(function()
{
    $("#createBoard").click(function()
    {
      var valid = true;

      if($('#newCode').val() == "" || $('#newTitle').val() == "")
      {
        valid = false;
      }

      if(valid)
      {
        var code = $('#newCode').val();
        var title = $('#newTitle').val();

        $.get("http://localhost:9000/createboard/" + title + "/" + code + "/").done(function(res) {
          if(res != "Invalid board!")
          {
            SubmitCode(code);
          }
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

          $("#" + divId).fadeOut('fast', function(){
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

          $("#" + divId).fadeOut('fast', function(){
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
