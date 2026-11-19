var express = require('express');
var router = express.Router();
var Game = require('../models/Game');

// Список всех игр
router.get('/', function(req, res, next) {
    Game.find({})
        .then(games => {
            res.render('games', { games: games });
        })
        .catch(err => {
            console.error(err);
            res.render('games', { games: [] });
        });
});

// Страница одной игры по её уникальному slug (например, /games/blackjack)
router.get('/:slug', function(req, res, next) {
    Game.findOne({ slug: req.params.slug })
        .then(game => {
            if (!game) {
                // Если игры с таким slug нет, отдаем 404
                return res.status(404).send('Game not found / Игра не найдена');
            }
            res.render('game', { game: game });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server Error');
        });
});

module.exports = router;