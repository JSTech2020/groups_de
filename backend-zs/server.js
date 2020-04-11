const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
  'mongodb://localhost:27017/zukunftschreiben';
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

var userRoutes = require("./routes/user.routes");
var storyRoutes = require('./routes/story.routes');
var registrationRoutes = require('./routes/registration.routes');

app.use('/api/', userRoutes());
app.use('/api/stories', storyRoutes());
app.use('/api/registration', registrationRoutes);