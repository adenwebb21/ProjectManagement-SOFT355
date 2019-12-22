var chai = require("chai");
var chaiHttp = require("chai-http");

var app = require("../test").app;

chai.use(chaiHttp); // Configure Chai.
suite("Test the server", function()
{
  test("Test /listtasks/ endpoint", function()
  {
    chai.request(app).get("/listtasks/").end(function(err, res)
    {
      chai.assert.equal(res.status, 200);
      chai.assert.equal(res.text, "Hello Joan");
    });
    chai.request(app).get("/sayhello/47").end(function(err, res)
    {
      chai.assert.equal(res.status, 200);
      chai.assert.equal(res.text, "Invalid user");
    });
  });

  test("Test non-existant endpoint", function()
  {
    chai.request(app).get("/doesnt-exist/").end(function(err, res)
    {
      chai.assert.equal(res.status, 404);
    });
  });

  test("Test forbidden endpoint", function()
  {
    chai.request(app).get("/forbidden").end(function(err, res)
    {
      chai.assert.equal(res.status, 403);
    });
  });

});
