var express = require('express');
var router = express.Router();
var User = require('../models/User');

// Страница регистрации (GET)
router.get('/register', function(req, res) {
    res.render('register');
});

// Обработка формы регистрации (POST)
router.post('/register', function(req, res) {
    var { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.send('Заполните все поля / Fill all fields');
    }

    User.create({ username, email, password })
        .then(user => {
            req.session.user = user; // Авторизуем сразу после регистрации
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.send('Ошибка регистрации. Возможно, такой email или никнейм уже занят.');
        });
});

// Выход из системы (правильный способ)
router.get('/logout', function(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); // Очищаем куку сессии
        res.redirect('/');
    });
});

module.exports = router;