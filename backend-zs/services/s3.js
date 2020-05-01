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

exports.getElement = function (element, bucket, res) {
    var params = { Bucket: bucket, Key: element };
    s3.getObject(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.writeHead(200, { 'Content-Type': data.ContentType });
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
    });
}

exports.checkElements = async (elements, bucket) => {
    for (var element of elements) {
        try {
            await s3.headObject({ Bucket: bucket, Key: element }).promise()
        } catch (err) {
            if (err.code === 'NotFound') {
                err.message = 'element ' + element + ' does not exist'
                return err;
            }
            err.statusCode = 500
            return err
        }
    }
}

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
