var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../express-tasks").app;

chai.use(chaiHttp); // Configure Chai.

suite("Test the server", function()
{
  test("Test /listtasks/ endpoint", function()
  {
    chai.request('http://localhost:9000').get("/listtasks/").end(function(err, res)
    {
      chai.assert.equal(res.status, 200);
    });

    chai.request('http://localhost:9000').get("/listtasks/").end(function(err, res)
    {
      chai.assert.isArray(res.body);
      chai.assert.lengthOf(res.body, 10);
      chai.assert.property(res.body[0], 'id');
      chai.assert.property(res.body[0], 'title');
      chai.assert.property(res.body[0], 'desc');
      chai.assert.property(res.body[0], 'due');
      chai.assert.property(res.body[0], 'priority');
    });

    chai.request('http://localhost:9000').get("/listtasks/").end(function(err, res)
    {
      chai.assert.equal(res.body[0].id, 0);
      chai.assert.equal(res.body[0].title, 'Task 0');
      chai.assert.equal(res.body[0].desc, "This is the description for task 0");
      chai.assert.equal(res.body[0].priority, 5);

      chai.assert.equal(res.body[5].id, 5);
      chai.assert.equal(res.body[5].title, 'Task 5');
      chai.assert.equal(res.body[5].desc, "This is the description for task 5");
      chai.assert.equal(res.body[5].priority, 5);
    });
  });

  test("Test /listtasks/0 endpoint", function()
  {
    chai.request('http://localhost:9000').get("/listtasks/0").end(function(err, res)
    {
      chai.assert.equal(res.status, 200);
    });

    chai.request('http://localhost:9000').get("/listtasks/0").end(function(err, res)
    {
      chai.assert.isNotArray(res.body);
      chai.assert.property(res.body, 'id');
      chai.assert.property(res.body, 'title');
      chai.assert.property(res.body, 'desc');
      chai.assert.property(res.body, 'due');
      chai.assert.property(res.body, 'priority');
    });

    chai.request('http://localhost:9000').get("/listtasks/0").end(function(err, res)
    {
      chai.assert.equal(res.body.id, 0);
      chai.assert.equal(res.body.title, 'Task 0');
      chai.assert.equal(res.body.desc, "This is the description for task 0");
      chai.assert.equal(res.body.priority, 5);
    });
  });

  test("test for non existant task", function()
  {
    chai.request('http://localhost:9000').get("/listtasks/20").end(function(err, res)
    {
      chai.assert.equal(res.status, 200);
    });

    chai.request('http://localhost:9000').get("/listtasks/20").end(function(err, res)
    {
      chai.assert.equal(res.text, "Invalid task!");
    });
  });

  test("Test non-existant endpoint", function()
  {
    chai.request('http://localhost:9000').get("/doesnt-exist/").end(function(err, res)
    {
      chai.assert.equal(res.status, 404);
    });
  });

  test("Test forbidden endpoint", function()
  {
    chai.request('http://localhost:9000').get("/forbidden").end(function(err, res)
    {
      chai.assert.equal(res.status, 403);
    });
  });


});
