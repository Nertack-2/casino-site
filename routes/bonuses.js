var express = require('express');
var router = express.Router();
var Bonus = require('../models/Bonus');
var requireAuth = require('../middleware/auth'); // <-- Подключаем защиту

// 10.8: requireAuth не пустит гостей
router.get('/', requireAuth, function(req, res, next) {
    Bonus.find({})
        .then(bonuses => {
            res.render('bonuses', { bonuses: bonuses });
        })
        .catch(err => {
            console.error(err);
            res.render('bonuses', { bonuses: [] });
        });
});

module.exports = router;