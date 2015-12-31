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

  signedUrl: function(req, res) {
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var randomStr = this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: randomStr + '.m4a',
        Expires: 1000,
        //ContentEncoding: 'ascii',
        ContentType: 'audio/x-m4a',
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.status(200).json({
              signed_request: data,
              url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+s3_params.Key
            })
            res.end();
        }
    });
  },

  // putToS3: function(req, res) {
  //   aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
  //   var s3 = new aws.S3();
  //   var randomStr = this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  //   var file = req.body.file;
  //   //console.log("Request body from client: ", req.body);
  //   var s3_params = {
  //     Bucket: S3_BUCKET,
  //     Body: file,
  //     Key: randomStr + '.m4a',
  //     Expires: 10000,
  //     ContentEncoding: 'ascii',
  //     ContentType: 'application/octet-stream',
  //     ACL: 'public-read'
  //   }
  //   console.log("S3 params body: ", s3_params.Body);
  //   s3.putObject(s3_params, function(err, data) {
  //     if(err) {
  //       console.log(err, err.stack); // an error occurred
  //       res.status(404).json({error: err});
  //     } else {
  //       console.log(data);           // successful response
  //       res.status(200).json(data);
  //       res.end();
  //     }
  //   });
  // }

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
