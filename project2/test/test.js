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
      chai.assert.property(res.body[0], 'id');
      chai.assert.property(res.body[0], 'title');
      chai.assert.property(res.body[0], 'desc');
      chai.assert.property(res.body[0], 'due');
      chai.assert.property(res.body[0], 'priority');
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

  test("Test adding new task", function()
  {
    chai.request('http://localhost:9000').get("/newtask/test1/test1Desc/2020-01-12T00:00:00.000Z/2").end(function(err, res)
    {
      chai.assert.equal(res.status, 200);
      chai.assert.equal(res.body.title, "test1");
      chai.assert.equal(res.body.desc, "test1Desc");
      chai.assert.equal(res.body.due, "2020-01-12T00:00:00.000Z");
      chai.assert.equal(res.body.priority, 2);
    });
  });

  test("Test removing task", function()
  {
    chai.request('http://localhost:9000').get("/removetask/:10").end(function(err, res)
    {
      chai.assert.equal(res.status, 200);
    });
  });
});
