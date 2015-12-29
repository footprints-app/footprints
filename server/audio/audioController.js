/**
 * A module that contains all functions to interact with our audio hosting service (AWS, S3)
 * @module audio/audioController
 * @requires aws-sdk
 */

var aws = require('aws-sdk');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID2 || 'AKIAJHNJSA3HCJDPQATQ';
var AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY || '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';
var S3_BUCKET = process.env.S3_BUCKET || 'walking-tour-media';

module.exports = {
  signedUrl: function(req, res) {
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name || 'testFileName',//Change to the name of the file
        Expires: 1000,
        ContentType: req.query.file_type || 'audio/m4a',//Change to file type
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            // var return_data = {
            //     signed_request: data,
            //     url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            // };
            // res.write(JSON.stringify(return_data));
            res.status(200).json({
              signed_request: data,
              url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+s3_params.Key
            })
            res.end();
        }
    });
  }
}
