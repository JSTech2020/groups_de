var path = require('path')
var AWS = require('aws-sdk');
var multer = require('multer')
var multerS3 = require('multer-s3')

var s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_URL,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
});

// multer is a middleware for uploading multipart form
// data to s3
exports.multerS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, req.user._id + '-' + Date.now() + path.extname(file.originalname))
        }
    })
})


exports.deleteElements = function (elements, bucket) {
    elements.forEach(element => {
        var params = { Bucket: bucket, Key: element };
        s3.deleteObject(params, function (err, _data) {
            if (err) {
                console.error(err)
            }
        })
    })
}
