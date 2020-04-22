const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();

/*const mailjet = require ('node-mailjet');
mailjet.connect('e04df2261ffd2418701c57af19f22996', '0cd4198140025453100666455a33c956')
const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[{
      "From": {
        "Email": "felix@zukunftschreiben.org",
        "Name": "Mailjet Pilot"
      },
      "To": [{
        "Email": "dimitri.tyan@gmail.com",
        "Name": "passenger 1"
      }],
      "Subject": "Your email flight plan!",
      "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
    }]
  })
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })*/

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
// app.use('/api/', userRoutes(passport, upload));
app.use('/api/', userRoutes(passport));

var storyRoutes = require('./routes/story.routes')
app.use('/api/stories', passport.authenticate('jwt', { session: false }), storyRoutes())

var projectRoutes = require("./routes/project.routes");
app.use('/api/projects', passport.authenticate('jwt', { session: false }), projectRoutes())
