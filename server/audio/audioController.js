/**
 * A module that contains all functions to interact with our audio hosting service (AWS, S3)
 * @module audio/audioController
 * @requires aws-sdk
 */

var aws = require('aws-sdk');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID_AUDIO || 'AKIAJZBWCDR2624XAFLA';
var AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY_AUDIO || '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';
var S3_BUCKET = process.env.S3_BUCKET || 'walking-tour-media';

module.exports = {
  signedUrl: function(req, res) {
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name || 'testFileName',//Change to the name of the file
        Expires: 1000,
        //TODO: Error from S3 when ContentType is set.  What is the content-type for base64 encoded files?
        //ContentType: req.query.file_type || 'application/octet-stream',//Change to file type
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
