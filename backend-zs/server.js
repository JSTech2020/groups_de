const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();

const app = express()

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

var registrationRoutes = require('./routes/registration.routes');
app.use('/api/registration', registrationRoutes);

var userRoutes = require("./routes/user.routes");
//app.use('/api/', userRoutes(passport, upload));
app.use('/api/', userRoutes(passport));

var storyRoutes = require('./routes/story.routes')
app.use('/api/stories', passport.authenticate('jwt', { session: false }), storyRoutes())

var projectRoutes = require("./routes/project.routes");
app.use('/api/projects', passport.authenticate('jwt', { session: false }), projectRoutes())

var postRoutes = require("./routes/post.routes");
app.use('/api/post', passport.authenticate('jwt', { session: false }), postRoutes())

var privacyPolicy = require('./routes/privacyPolicy.route')
app.use('/api/', privacyPolicy())

var mediaRoutes = require("./routes/media.routes");
app.use('/api/media', passport.authenticate('jwt', { session: false }), mediaRoutes())

var feedRoutes = require("./routes/feed.routes");
app.use('/api/feed/', feedRoutes())

// var fakedata = require("./fakedata")
// fakedata.createFakeData()