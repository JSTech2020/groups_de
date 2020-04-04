var User = require('../models/user.model').User;

exports.getUsers = function (req, res) {
    User.find()
    .then(users => { res.json(users) })
    .catch(error => res.json({ error: error.message }));;
}
  
