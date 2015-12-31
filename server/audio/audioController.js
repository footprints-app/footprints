/**
 * A module that contains all functions to interact with our audio hosting service (AWS, S3)
 * @module audio/audioController
 * @requires aws-sdk
 */

var aws = require('aws-sdk');
var config = require('../config/config.js');

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
        ContentType: 'audio/m4a',
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
  }
}
