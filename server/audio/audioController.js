/**
 * A module that contains all functions to interact with our audio hosting service (AWS, S3)
 * @module audio/audioController
 * @requires aws-sdk
 */

var aws = require('aws-sdk');
var config = require('../config/config.js');
var Putter = require('base64-string-s3');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID_AUDIO || config.AWS_ACCESS_KEY_ID_AUDIO;
var AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY_AUDIO || config.AWS_SECRET_ACCESS_KEY_AUDIO;
var S3_BUCKET = process.env.S3_BUCKET || config.S3_BUCKET;

module.exports = {

  randomString: function(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  },

  putToS3: function(req, res) {
    var options = {
      key: AWS_ACCESS_KEY,
      secret: AWS_SECRET_KEY,
      bucket: S3_BUCKET,
      chunkSize: 512 // [optional] defaults to 1024
    }
    var putter = new Putter(options);
    var file = req.body.file;
    var randomStr = this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    // put arguments: base64 string, object key, mime type, permissions
    putter.put(file, randomStr + '.m4a', 'audio/x-m4a', 'public-read');

    putter.on('progress', function (data) {
        console.log('progress', data);
        // progress { percent: 20, written: 768, total: 3728 }
    });

    putter.on('response', function (data) {
        console.log('response', data);
        res.status(200).json(data);
        // response { path: 'https://<bucket>.s3.amazonaws.com/images/success.jpg' }
    });

    putter.on('error', function (err) {
        console.error(err);
        res.status(404).json({error: err});
    });

    putter.on('close', function () {
        console.log('closed connection');
    });
  }

}
