var highestId = 0;
var tasks = [];
var data = [];

$(function()
{
    $.getJSON("http://localhost:9000/listtasks", {}, function(res)
    {
      $.each(res, function(index)
      {
        $.getJSON("http://localhost:9000/listcolumns/bytask/" + res[index].id).done(function(column)
        {
          var tempTask = res[index];
          columnName = column.title;
          console.log("Column name is: " + columnName);
          var divId = "div" + tempTask.id;

          $("#" + columnName).append("<div id=" + divId + ">");
          $("#" + divId).append("<p>" + "ID: " + tempTask.id);
          $("#" + divId).append("<p>" + "Title: " + tempTask.title);
          $("#" + divId).append("<p>" + "Description: " + tempTask.desc);
          $("#" + divId).append("<p>" + "Priority: " + tempTask.priority);
          $("#" + divId).append("<p>" + "Due Date: " + tempTask.due);
          $("#" + divId).append('<button name="removebtn" id="' + tempTask.id + '" type="button">Remove</button><br><br>');
        });
      });
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
          $("#To-Do").append("<div id=" + divId + ">");
          $("#" + divId).append("<p>" + "ID: " + data.id);
          $("#" + divId).append("<p>" + "Title: " + data.title);
          $("#" + divId).append("<p>" + "Description: " + data.desc);
          $("#" + divId).append("<p>" + "Priority: " + data.priority);
          $("#" + divId).append("<p>" + "Due Date: " + data.due);
          $("#" + divId).append('<button name="removebtn" id="' + data.id + '" type="button">Remove</button><br><br>');
          $("#" + divId).append('<button name="movebtn" id="' + data.id + '" type="button">Move Right</button><br><br>');
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

$(document).on('click', 'button[name ="movebtn"]', function()
{
  var id = $(this).attr('id');
  $.get("http://localhost:9000/movetasktoright/:" + id, {}, function(res) {});

});
