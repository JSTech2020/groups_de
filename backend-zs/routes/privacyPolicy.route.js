
module.exports = privacyPolicyRoute;

function privacyPolicyRoute(){
    var privacyPolicyController = require('../controllers/privacyPolicy.controller');

    var router = require('express').Router();
    router.get("/privacy-policy", privacyPolicyController.getPrivacyPolicy)
    return router
}