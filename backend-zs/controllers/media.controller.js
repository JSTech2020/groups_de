
require('dotenv').config(); // Loading dotenv to have access to env variables
var S3 = require('../services/s3')
const AWS = require('aws-sdk'); // Requiring AWS SDK.

//Code from following blog post - https://medium.com/@diego.f.rodriguezh/direct-image-upload-to-aws-s3-with-react-and-express-2f063bc15430

// Configuring AWS
AWS.config = new AWS.Config({
    accessKeyId: process.env.S3_KEY, // stored in the .env file
    secretAccessKey: process.env.S3_SECRET, // stored in the .env file
    region: process.env.BUCKET_REGION // This refers to your bucket configuration.
});

const s3 = new AWS.S3();
const Bucket = process.env.BUCKET_NAME;

function generateGetUrl(Key) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket,
            Key,
            Expires: 604800 // 7 days
        };
        // Note operation in this case is getObject
        s3.getSignedUrl('getObject', params, (err, url) => {
            if (err) {
                reject(err);
            } else {
                // If there is no errors we will send back the pre-signed GET URL
                resolve(url);
            }
        });
    });
}

// PUT URL Generator
function generatePutUrl(Key, ContentType) {
    return new Promise((resolve, reject) => {
        // Note Bucket is retrieved from the env variable above.
        const params = { Bucket, Key, ContentType };
        // Note operation in this case is putObject
        s3.getSignedUrl('putObject', params, function (err, url) {
            if (err) {
                reject(err);
            }
            // If there is no errors we can send back the pre-signed PUT URL
            resolve(url);
        });
    });
}


exports.getUrl = function (req, res) {
    const { Key } = req.query;
    generateGetUrl(Key)
        .then(getURL => {
            res.send(getURL);
        })
        .catch(err => {
            res.send(err);
        });
};


exports.putUrl = function (req, res) {
    const { Key, ContentType } = req.query;
    generatePutUrl(Key, ContentType).then(putURL => {
        res.send({ putURL });
    })
        .catch(err => {
            res.send(err);
        });
};

exports.uploadMedia = function (req, res) {
    res.json({ 'uploaded_media': req.files.map(file => { console.log(file); return file.key }) })
}

exports.getFile = function (req, res) {
    S3.getElement(req.params.fileName, process.env.S3_BUCKET_NAME, res)
}