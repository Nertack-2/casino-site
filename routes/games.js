var express = require('express');
var router = express.Router();
var Game = require('../models/Game');

router.get('/', function(req, res, next) {
    Game.find({})
        .then(games => {
            res.render('games', { games: games });
        })
        .catch(err => {
            console.error("🔥 ОШИБКА ПРИ ЗАПРОСЕ ИГР:", err); // <--- ВОТ ЭТО ВЫВЕДЕТ ОШИБКУ
            res.render('games', { games: [] });
        });
});

module.exports = router;