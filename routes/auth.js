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

// --- 10.4 & 10.6: Страница входа (Login) ---
router.get('/login', function(req, res) {
    var error = req.session.error;
    req.session.error = null;
    res.render('login', { error: error });
});

// --- 10.6: Обработка ошибки аутентификации ---
router.post('/login', function(req, res) {
    var { email, password } = req.body;

    User.findOne({ email: email, password: password })
        .then(user => {
            if (!user) {
                req.session.error = 'Неверный email или пароль / Invalid email or password';
                return res.redirect('/auth/login');
            }
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.send('Ошибка сервера');
        });
});

// --- 10.7: Функциональность logout ---
router.get('/logout', function(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Ошибка при выходе:', err);
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); // Очищаем куку сессии
        res.redirect('/'); // Возвращаем на главную
    });
});

module.exports = router;