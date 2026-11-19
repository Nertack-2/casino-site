var express = require('express');
var router = express.Router();
var requireAuth = require('../middleware/auth');

router.get('/', requireAuth, function(req, res) {
    res.render('account');
});

module.exports = router;