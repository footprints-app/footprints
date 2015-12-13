var chai = require("chai");
var should = chai.should();
var expect = chai.expect;
var mysql = require("mysql");
var request = require("supertest");
var Promise = require('bluebird');

describe('/tours functionality', function(done) {
	var dbConnection;
	var url = 'http://127.0.0.1:8000';

  before(function(done) {
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
      } else {
        console.log('Database connected!');
      }
    });


    var tableQuery = function(queryStr, data, tableName, callback) {
    	dbConnection.query(queryStr, data, function(err, results) {
				if(err) {
					callback(err);
				} else {
					console.log("Seeded" + tableName + "table");
					callback(err, results);
				}
			});
    }

    var tableQueryAsync = Promise.promisify(tableQuery);

		var tours = [ ["By the water", 1, "Take a walk along the Embacadero", "Leisure", 2.5, 2],
				[ "Midnight walk", 1, "Stroll on 6th street", "Sports", 3, 1],
				[ "Watch your feet!", 2, "Enjoy the streets of the Tenderloin", "Adventure", 2, 1]]
		var cities = [["San Francisco", "CA", "USA"], ["Cupertino", "CA", "USA"]];
		var places = [["Hack Reactor", 1, "123 Market St.", "Learn to code here!", 0], ["Gym", 2, "233 Market St.", "Work it!", 1]];
		
		var toursQuery = "INSERT into tours (tourName, userId, description, category, duration, cityId) VALUES (?, ?, ?, ?, ?, ?)"
		var citiesQuery = "INSERT into cities (cityName, state, country) VALUES(?, ?, ?)";
		var placesQuery = "INSERT into places (placeName, tourId, address, description, placeOrder) VALUES(?, ?, ?, ?, ?)";

		//**** A much cleaner way to use promises, but it doesn't work for some reason.... ****
		// Promise.each(tours, function (value, index, length) {
		// 	tableQueryAsync(toursQuery, value, "tours");
		// })
		// .then(Promise.each(cities, function (value, index, length) {
		// 	tableQueryAsync(citiesQuery, value, "cities");
		// }))
		// .then(Promise.each(places, function (value, index, length) {
		// 	tableQueryAsync(placesQuery, value, "places");
		// }))
		// .then(function() {
		// 	done();
		// })

		tableQueryAsync(toursQuery, tours[0], "tours")
		.then(tableQueryAsync(toursQuery, tours[1], "tours"))
		.then(tableQueryAsync(toursQuery, tours[2], "tours"))		
		.then(tableQueryAsync(citiesQuery, cities[0], "cities"))
		.then(tableQueryAsync(citiesQuery, cities[1], "cities"))
		.then(tableQueryAsync(placesQuery, places[0], "places"))
		.then(tableQueryAsync(placesQuery, places[1], "places"))
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
	        console.log("Truncated" + tablename);
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

  //   truncate("tours");
  //   truncate("places");
  //   truncate("cities");
		// dbConnection.end();
		// done();
  });

	describe('getOneTour functionality', function() {
		var paramId = 2;
		it('should retrieve a tour based on id', function(done) {
			request(url)
				.get('/tours/' + paramId)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.id).to.equal(paramId);
					expect(res.body.userId).to.be.a('number');
					expect(res.body.tourName).to.be.a('string');
					expect(res.body).to.have.property('description');
					expect(res.body.category).to.not.equal(null);
					done();
				});
		});

	});

	describe('getAllTours functionality', function() {

		it('should retrieve all tours', function(done){
			request(url)
				.get('/tours/alltours')
				.expect(200)
				.end(function(err, res) {
					if(err) {
						throw err
					} else {
						expect(res.body).to.exist;
						expect(res.body).to.have.length.above(0);
						done();
					}
				})
		});

		it('should respond with an array of objects', function(done){
			request(url)
				.get('/tours/alltours')
				.expect(200)
				.end(function(err, res) {
					if(err) {
						throw err
					} else {
						expect(res.body).to.be.an('array');
						expect(res.body[0]).to.be.an('object');
						done();
					}
				});
		});

	});

	describe('getUserTours functionality', function() {

		it('should retrieve user specific tours', function(done){
			var user = 1;

			request(url)
				.get('/tours/mytours/1')
				.expect(200)
				.end(function(err, res) {
					if(err) {
						throw err;
					} else {
						expect(res).to.exist;
						expect(res.status).to.equal(200);
						expect(res.body[0].userId).to.equal(user);
						expect(res.body[1].userId).to.equal(user);
						done();
					}
				});
		});

		it('should respond with an array of objects', function(done) {
			request(url)
				.get('/tours/mytours/1')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err)
					} else {
						expect(res.body).to.have.length.above(0);
						expect(res.body).to.be.an('array');
						expect(res.body[0]).to.be.an('object');
						done();
					}
				});
		});

	});

	describe('createTour functionality', function() {
		var tourInfo = { tourName: "By the Bay",
										userId: 1,
										description: "Take a walk along the Embacadero",
										category: "Leisure",
										duration: 2,
										cityName: "San Francisco",
										state: "CA",
										country: "USA" };

		it('should create new tour entry in database', function(done){
			request(url)
				.post('/tours/createtour')
				.send(tourInfo)
				.expect('Content-Type', /json/)
				.expect(201)
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.status).to.equal(201)
					expect(res.body.id).to.exist;
					done();
				});
		});

	});

	describe('addPlace functionality', function() {
		var placeInfo = { placeName: "Ferry Building",
											address: "San Francisco Ferry Bldg, San Francisco, CA 94105",
											description: "The San Francisco Ferry Building is a terminal for \ " +
											"ferries that travel across the San Francisco Bay, a food hall, and \ " +
											"also has offices, located on The Embarcadero in San Francisco, California.",
											placeOrder: 3,
											tourId: 2 };

		it('should add a place to the database', function(done) {
			request(url)
				.post('/tours/addplace')
				.send(placeInfo)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.id).to.equal(placeInfo.tourId);
					done();
				});
		});
	});
});
