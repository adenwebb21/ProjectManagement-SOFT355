var highestId = 0;
var tasks = [];

//$(function()
//{
    //$.get("http://localhost:9000/listtasks", {}, function(res) {
      //let data = res;
      //var columnName = "";

      //for (var i = 0; i < data.length; i++) {
        //tasks[i] = data[i];

        //console.log(tasks);

        //$.get("http://localhost:9000/listcolumns/bytask/" + tasks[i].id).done(function(res)
        //{
          //columnName = res.title;
          //var divId = "div" + tasks[i].id;
          //$("#" + columnName).append("<div id=" + divId + ">");
          //$("#" + divId).append("<p>" + "ID: " + tasks[i].id);
          //$("#" + divId).append("<p>" + "Title: " + tasks[i].title);
          //$("#" + divId).append("<p>" + "Description: " + tasks[i].desc);
          //$("#" + divId).append("<p>" + "Priority: " + tasks[i].priority);
          //$("#" + divId).append("<p>" + "Due Date: " + tasks[i].due);
          //$("#" + divId).append('<button name="removebtn" id="' + tasks[i].id + '" type="button">Remove</button><br><br>');
        //});
      //}
  //});
//});

$(function()
{
    $.get("http://localhost:9000/listcolumns").done(function(res){
      let data = res;
      let columns = [];

      console.log(data);

      for (var i = 0; i < data.length; i++) {
        columns[i] = data[i];

        for (var j = 0; j < columns[i].tasks.length; j++)
        {
          $.get("http://localhost:9000/listtasks/" + columns[i].tasks[j]).done(function(res)
          {
            var divId = "div" + res.id;
            $("#To-Do").append("<div id=" + divId + ">");
            $("#" + divId).append("<p>" + "ID: " + res.id);
            $("#" + divId).append("<p>" + "Title: " + res.title);
            $("#" + divId).append("<p>" + "Description: " + res.desc);
            $("#" + divId).append("<p>" + "Priority: " + res.priority);
            $("#" + divId).append("<p>" + "Due Date: " + res.due);
            $("#" + divId).append('<button name="removebtn" id="' + res.id + '" type="button">Remove</button><br><br>');
          });
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
          $("#To-Do").append("<div id=" + divId + ">");
          $("#" + divId).append("<p>" + "ID: " + data.id);
          $("#" + divId).append("<p>" + "Title: " + data.title);
          $("#" + divId).append("<p>" + "Description: " + data.desc);
          $("#" + divId).append("<p>" + "Priority: " + data.priority);
          $("#" + divId).append("<p>" + "Due Date: " + data.due);
          $("#" + divId).append('<button name="removebtn" id="' + data.id + '" type="button">Remove</button><br><br>');
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
