$(function() {
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
