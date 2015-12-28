var chai = require("chai");
var should = chai.should();
var expect = chai.expect;
var image = require('../images/imageController');
var mysql = require("mysql");
var request = require("supertest");
var Promise = require('bluebird');
var fs = require('fs');

describe('multi-media upload functionality', function() {

  xdescribe('image upload functionality', function() {
    it('should upload an image file to cloudinary and return a url', function(done) {
      image.upload('server/test_images/manaslu-circuit-trek.jpg', function(imageUrl) {
        expect(imageUrl).to.be.a('string');
        expect(imageUrl.slice(0,4)).to.equal('http');
        done();
      });
    });
  });


  describe('adding image urls to the database', function() {
    var dbConnection;
    var url = 'http://127.0.0.1:8000';

    before(function(done) {
      dbConnection = mysql.createConnection({
        host: process.env.RDS_HOSTNAME || 'localhost',
        user: process.env.RDS_USERNAME || "root",
        password: process.env.RDS_PASSWORD || "",
        database: process.env.database || "thesis",
        port: process.env.RDS_PORT || 3306
      });
      dbConnection.connect(function(err) {
        if(err) {
          console.error('Connection Error:', err);
        } else {
          console.log('Database connected!');
        }
      });
    

    var tableQuery = function(queryStr, data, tableName, callback) {
      dbConnection.query(queryStr, data, function(err, results) {
        if(err) {
          callback(err);
        } else {
          // console.log("Seeded" + tableName + "table");
          callback(err, results);
        }
      });
    };

    var tableQueryAsync = Promise.promisify(tableQuery);

    var tours = [ ["By the water", 1, "Take a walk along the Embacadero", "Leisure", 2.5, 2],
        [ "Midnight walk", 1, "Stroll on 6th street", "Sports", 3, 1],
        [ "Watch your feet!", 2, "Enjoy the streets of the Tenderloin", "Adventure", 2, 1]]
    var cities = [["San Francisco", "CA", "USA"], ["Cupertino", "CA", "USA"]];
    var places = [["Hack Reactor", 1, "123 Market St.", "Learn to code here!", 2], ["Saigon Sandwiches", 1, "598 Larkin St.", "Yum!", 1], ["Civic Center", 1, "456 Hayes St.", "Nice grass lawn", 0], ["Gym", 2, "233 Market St.", "Work it!", 1]];
    
    var toursQuery = "INSERT into tours (tourName, userId, description, category, duration, cityId) VALUES (?, ?, ?, ?, ?, ?)"
    var citiesQuery = "INSERT into cities (cityName, state, country) VALUES(?, ?, ?)";
    var placesQuery = "INSERT into places (placeName, tourId, address, description, placeOrder) VALUES(?, ?, ?, ?, ?)";


    tableQueryAsync(toursQuery, tours[0], "tours")
    .then(tableQueryAsync(toursQuery, tours[1], "tours"))
    .then(tableQueryAsync(toursQuery, tours[2], "tours"))   
    .then(tableQueryAsync(citiesQuery, cities[0], "cities"))
    .then(tableQueryAsync(citiesQuery, cities[1], "cities"))
    .then(tableQueryAsync(placesQuery, places[0], "places"))
    .then(tableQueryAsync(placesQuery, places[1], "places"))
    .then(tableQueryAsync(placesQuery, places[2], "places"))
    .then(tableQueryAsync(placesQuery, places[3], "places"))
    .then(function() {
            done();
    });
  });

  after(function(done) {
    
    var truncate = function(tablename, callback) {
      dbConnection.query("truncate " + tablename, function(err, results) {
        if(err) {
          console.error('Connection Error: ', err);
          callback(err);
        } else {
          // console.log("Truncated" + tablename);
          callback(err, results);
        }
      });
    }

    var truncateAsync = Promise.promisify(truncate);

    truncateAsync("tours")
      .then(truncateAsync("places"))
      .then(truncateAsync("cities"))
      .then(function() {
        dbConnection.end();
        done();
      })
  });

  xdescribe('adding image to a specific tour', function() {
    var photoData;
    var tourQuery = "SELECT * FROM tours WHERE id = 1";

    it('should receive an image file with a tourId and store its url in the database', function(done) {
      this.timeout(2800);
      fs.readFile('server/test_images/manaslu-circuit-trek.jpg', function(err, data) {
        if(err){
          console.error(err);
        } else {
          photoData = data;
          request(url)
            .post('/tours/tourphoto/1')
            .send(photoData)
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
              expect(err).to.equal(null);
              expect(res.body).to.be.a('string');
              dbConnection.query(tourQuery, function(err, results) {
                if(err) {
                  console.log('error');
                } else {
                  var tour = results[0];
                  expect(tour.image).to.be.a('string');
                  done();             
                }
              });
            });
          }
        });
      });
    });
  });
});