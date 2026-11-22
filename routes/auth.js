var express = require('express');
var router = express.Router();
var User = require('../models/User');

// 10.1: Страница регистрации (GET)
router.get('/register', function(req, res) {
    res.render('register');
});

// 10.3: Подготовка данных для передачи на сервер (POST)
router.post('/register', function(req, res) {
    var { username, email, password } = req.body;

    // Простая проверка на заполнение полей
    if (!username || !email || !password) {
        return res.send('Заполните все поля / Fill all fields');
    }

    // Пока просто выводим в консоль для проверки
    console.log("Данные из формы:", { username, email, password });
    res.send('Данные получены! / Data received!');
});

module.exports = router;