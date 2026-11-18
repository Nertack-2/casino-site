var express = require('express');
var router = express.Router();

// Главная страница списка игр
router.get('/', function (req, res, next) {
    res.send('Games page — список игр казино (пока просто текст)');
});

module.exports = router;