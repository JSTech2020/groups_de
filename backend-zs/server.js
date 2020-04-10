const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
<<<<<<< HEAD
<<<<<<< HEAD
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
=======
const auth = require("./middleware/auth");
require('dotenv').config()

>>>>>>> 6466538... add jwt authentication middleware and move config to .env files
=======
const auth = require("./middleware/auth");
require('dotenv').config()

>>>>>>> 13b15d2... add jwt authentication middleware and move config to .env files
const app = express();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
const router = express.Router();


mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./auth/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger(process.env.ENV));

app.listen(process.env.API_PORT, () => console.log(`LISTENING ON PORT ${process.env.API_PORT}`));

const userRoutes = require("./routes/user.routes");
app.use('/api/', userRoutes(passport));

var storyRoutes = require('./routes/story.routes')
app.use('/api/stories', auth.authenticateUser, storyRoutes())

app.use('/api/', userRoutes());
app.use('/api/stories', storyRoutes())

var projectRoutes = require("./routes/project.routes");
app.use('/api/', projectRoutes());