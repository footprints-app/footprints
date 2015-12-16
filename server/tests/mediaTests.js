var chai = require("chai");
var should = chai.should();
var expect = chai.expect;
var image = require('../images/imageController');

describe('multi-media upload functionality', function() {

  describe('image upload functionality', function() {
    it('should upload an image file to cloudinary and return a url', function(done) {
      image.upload('server/test_images/manaslu-circuit-trek.jpg', function(imageUrl) {
        expect(imageUrl).to.be.a('string');
        expect(imageUrl.slice(0,4)).to.equal('http');
        done();
      });
    });
  });

});