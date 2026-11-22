var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // --- 9.4: СЧЕТЧИК ПОСЕЩЕНИЙ ---
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
    res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });
  }
  res.redirect('back');
});

module.exports = router;