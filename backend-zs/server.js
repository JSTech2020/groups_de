const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const sgMail = require('@sendgrid/mail');
var multer = require('multer');
var multerS3 = require('multer-S3');
require('dotenv').config();

const app = express()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*var AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  Bucket: BUCKET_NAME,
  region: 'eu-west-3'
});

const multerS3Config = multerS3({
  s3: s3,
  bucket: BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    console.log(file)
    cb(null, new Date().toISOString())
  }
});

const upload = multer({
  storage: multerS3Config,
  limits: {
    fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
  }
});

const signedUrlExpireSeconds = 60 * 5

const url = s3.getSignedUrl('getObject', {
  Bucket: BUCKET_NAME,
  Key: '2020-04-15T11:35:52.216Z-Download.png',
  Expires: signedUrlExpireSeconds
});

console.log(url);*/

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./auth/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger(process.env.ENV));

app.listen(process.env.API_PORT, () => console.log(`LISTENING ON PORT ${process.env.API_PORT}`));


var userRoutes = require("./routes/user.routes");
// app.use('/api/', userRoutes(passport, upload));
app.use('/api/', userRoutes(passport));

var storyRoutes = require('./routes/story.routes')
app.use('/api/stories', passport.authenticate('jwt', { session: false }), storyRoutes())

var projectRoutes = require("./routes/project.routes");
app.use('/api/projects', passport.authenticate('jwt', { session: false }), projectRoutes())
