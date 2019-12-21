var schemas = require("./schemas");

async function getTasks()
{
  //await schemas.Task.findOne({"id": id});
  await schemas.Task.find();
}

module.exports.getTasks = getTasks;
