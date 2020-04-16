const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express()

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

var registrationRoutes = require('./routes/registration.routes');
app.use('/api/registration', registrationRoutes);

var userRoutes = require("./routes/user.routes");
app.use('/api/', userRoutes(passport));

var storyRoutes = require('./routes/story.routes')
app.use('/api/stories', passport.authenticate('jwt', { session: false }), storyRoutes())

var projectRoutes = require("./routes/project.routes");
app.use('/api/projects', passport.authenticate('jwt', { session: false }), projectRoutes())
