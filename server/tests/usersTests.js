var chai = require("chai");
var assert = require("chai").assert;
var should = chai.should();
var expect = chai.expect;

var http   = require("http");
var mysql = require("mysql");
var request = require("request");

describe('Server signup functionality', function() {

  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      host: process.env.RDS_HOSTNAME || 'localhost',
      user: process.env.RDS_USERNAME || "root",
      password: process.env.RDS_PASSWORD || "",
      database: process.env.database || "thesis",
      port: process.env.RDS_PORT || 3306
    })
    dbConnection.connect(function(err) {
      if(err) {
        console.error('Connection Error:', err);
        done();
      } else {
        console.log('Database connected!');
        done();
      }
    });
  });

  afterEach(function(done) {
    var tablename = "users"
    //Empty table before each test
    dbConnection.query("truncate " + tablename, function(err) {
      if(err) {
        console.error('Connection Error: ', err);
        done();
      } else {
        dbConnection.end();
        done();
      }
    });
  });
  
  it("should return a user's information after signup", function (done) {
    var userInfo = {firstName: "Ray", lastName: "Bradbury", userName: "rbrad", password: "mars"};
    request({method: "POST",
             uri: "http://127.0.0.1:8000/users/signup",
             json: userInfo
            },
            function(error, response, body) {
              expect(body[0].userName).to.equal(userInfo.userName);
              expect(body[0].lastName).to.equal(userInfo.lastName);
              expect(body[0].firstName).to.equal(userInfo.firstName);
              done();
            });
  });

  it("should return an error message if username already exists", function (done) {
    var userInfo = {firstName: "Joe", lastName: "Haldeman", userName: "jhald", password: "war"};
    request({method: "POST",
             uri: "http://127.0.0.1:8000/users/signup",
             json: userInfo
            },
            function(error, response, body) {
              request({method: "POST",
                       uri: "http://127.0.0.1:8000/users/signup",
                       json: userInfo
                      },
                      function(error, response, body) {
                        var queryString = "SELECT * from users where userName='jhald'";
                        var queryArgs = [];

                        dbConnection.query(queryString, queryArgs, function(err, results) {
                          expect(results.length).to.equal(1);
                          expect(results[0].firstName).to.equal("Joe");
                          done();
                        });
                      })

            });
  })

});

