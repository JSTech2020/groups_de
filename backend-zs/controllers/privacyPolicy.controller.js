
const fs = require('fs');
var text = fs.readFileSync("./resources/privacy-policy.html",'utf8');

exports.getPrivacyPolicy = function (req,res) {
    res.json(text)
}