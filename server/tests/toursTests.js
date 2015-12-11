var chai = require("chai");
var should = chai.should();
var expect = chai.expect;
var mysql = require("mysql");
var request = require("supertest");

describe('/tours functionality', function() {
	var dbConnection;
	var url = 'http://127.0.0.1:8000';

	before(function(done) {
		dbConnection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'thesis'
		});

		dbConnection.connect(function(err) {
			if(err) {
				console.error('Connection Error: ', err);
			} else {
				console.log('Database is connected!');
			}
		});
	});

	after(function() {
		//var tablename = "tours";
		//
		//dbConnection.query("truncate " + tablename, function(err) {
		//	if(err) {
		//		console.error('Error in truncating: ', err);
		//		done();
		//	} else {
		//		dbConnection.end();
		//		done();
		//	}
		});
	});
	describe('getOneTour functionality', function() {
		var paramId = 2;
		it('should retrieve a tour based on id', function(done) {
			request(url)
				.get('/tours/' + paramId)
				.expect(200)
				.end(function(err, res) {
					expect(res.body.tourId).to.equal(paramId);
					expect(res.body.userId).to.be.a('number');
					expect(res.body.tourName).to.be.a('string');
					expect(res.body).to.have.property('description');
					expect(res.body.category).to.not.be(null);
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

		it('should retrieve user specific tours', function(){

			request(url)
				.get('/tours/mytours')
				.expect(200)
				.end(function(err, res) {
					if(err) {
						throw err;
					} else {
						expect(response).to.exist;
						expect(response.status).to.equal(200);
						expect(body[0].userId).to.equal(user);
						expect(body[1].userId).to.equal(user);
						done();
					}
				});
		});

		it('should respond with an array of objects', function() {
			request(url)
				.get('/tours/mytours')
				.expect(200)
				.end(function (err, res) {
					if (err) {
						return done(err)
					} else {
						expect(body).to.have.length.above(0);
						expect(body).to.be.an('array');
						expect(body[0]).to.be.an('object');
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
		it('should create new tour entry in database', function(){
			request(url)
				.post('/tours/createtour')
				.send(tourInfo)
				.expect('Content-Type', /json/)
				.expect(201)
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.status).to.equal(201)
					expect(res.body.tourId).to.exist;
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

		it('should add a place to the database', function() {
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
