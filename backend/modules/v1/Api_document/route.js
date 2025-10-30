var express = require('express');
var path = require('path');
var globals = require('../../../config/constant');
var user_model = require('../user/model/userModel');

var router = express.Router();

// Set the template engine ejs
// routes - remove the leading slash or use just the path
router.get('/', (req, res) => {
    res.render(path.join(__dirname + '/view/api_doc.ejs'), { globals: globals })
});

router.get('/code', (req, res) => {
    res.render(path.join(__dirname + '/view/reference_code.ejs'), { globals: globals })
});

router.get('/user_list', (req, res) => {
    user_model.api_user_list(function(response) {
        res.render(path.join(__dirname + '/view/user_list.ejs'), { data: response, globals: globals })
    });
});

module.exports = router;