var mongoose = require("mongoose");

var Task = mongoose.model("Task", {id: Number, title: String, desc: String, due: Number, priority: Number}); // number will be converted to a date later

module.exports.Task = Task;
