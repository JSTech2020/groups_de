var AWS = require('aws-sdk');

var s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_URL,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
});

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
