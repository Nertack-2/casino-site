var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

// Маршрут для переключения языка (он у тебя пропал)
router.get('/lang/:lang', function(req, res) {
  var lang = req.params.lang;
  if (lang === 'en' || lang === 'ru') {
    res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });
  }
  res.redirect('back'); // Возвращаем на ту же страницу
});

module.exports = router;