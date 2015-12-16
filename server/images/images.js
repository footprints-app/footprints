var cloudinary = require('cloudinary');
var config = require('../config/config')

cloudinary.config({ 
  cloud_name: config.cloud_name, 
  api_key: config.api_key, 
  api_secret: config.api_secret 
});

module.exports = {
/** A cloudinary upload API call returns a Hash with content similar to that shown in the following example:
    { 
      public_id: 'cr4mxeqx5zb8rlakpfkg',
      version: 1372275963,
      signature: '63bfbca643baa9c86b7d2921d776628ac83a1b6e',
      width: 864,
      height: 576,
      format: 'jpg',
      resource_type: 'image',
      created_at: '2013-06-26T19:46:03Z',
      bytes: 120253,
      type: 'upload',
      url: 'http://res.cloudinary.com/demo/image/upload/v1372275963/cr4mxeqx5zb8rlakpfkg.jpg',
      secure_url: 'https://res.cloudinary.com/demo/image/upload/v1372275963/cr4mxeqx5zb8rlakpfkg.jpg' 
    }
*/
  upload: function(file) {
    cloudinary.uploader.upload(file, function(result){
      console.log('image url: ', result.secure_url);
      return result.secure_url; 
    });
  }
}