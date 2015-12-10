var assert = require("chai").assert;
var should = chai.should();
var expect = chai.expect;

var http   = require("http");
var server = require("../myapp");

describe('User signup functionality in the server', function() {
  
  it("should return a 200 response", function (done) {

      var app = server();

      http.get("http://localhost:8000", function (res) {
          assert.equal(res.statusCode, 200);
          done();
      });
  });

});

