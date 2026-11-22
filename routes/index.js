var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.session.visits) {
    req.session.visits = 0;
  }
  req.session.visits++;

  res.render('index', { visits: req.session.visits });
});

// --- 9.2: ЗАПИСЬ ЯЗЫКА В COOKIE ---
router.get('/lang/:lang', function(req, res) {
  var lang = req.params.lang;
  if (lang === 'en' || lang === 'ru') {
    // Записываем выбранный язык в куку на 15 минут
    res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });
  }
  res.redirect('back');
});

module.exports = router;