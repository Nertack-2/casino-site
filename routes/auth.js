var express = require('express');
var router = express.Router();
var User = require('../models/User');

// --- 10.1: Страница регистрации ---
router.get('/register', function(req, res) {
    res.render('register');
});

// --- 10.4: Логика создания пользователя ---
router.post('/register', function(req, res) {
    var { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.send('Заполните все поля / Fill all fields');
    }

    User.create({ username, email, password })
        .then(user => {
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.send('Ошибка регистрации. Возможно, email или никнейм занят.');
        });
});

// --- 10.4: Страница входа (Login) ---
router.get('/login', function(req, res) {
    res.render('login');
});

// --- 10.4: Логика входа ---
router.post('/login', function(req, res) {
    var { email, password } = req.body;

    User.findOne({ email: email, password: password })
        .then(user => {
            if (!user) {
                return res.send('Неверный email или пароль / Invalid email or password');
            }
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.send('Ошибка сервера');
        });
});

// --- ЛОГИКА ВЫХОДА (Logout) ---
router.get('/logout', function(req, res) {
    req.session.destroy((err) => {
        if (err) return res.redirect('/');
        res.clearCookie('connect.sid'); // Очищаем куку сессии
        res.redirect('/');
    });
});

module.exports = router;