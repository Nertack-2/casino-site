var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');

var app = express();

// --- НАСТРОЙКА ШАБЛОНИЗАТОРА ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// --- СТАНДАРТНЫЕ MIDDLEWARE ---
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Важно: парсер куки должен быть ДО настройки языков
app.use(express.static(path.join(__dirname, 'public')));

// --- НАСТРОЙКА ЯЗЫКОВ (i18n) ---
var en = require('./locales/en');
var ru = require('./locales/ru');

app.use(function(req, res, next) {
  // Берем язык из куки, по умолчанию 'en'
  var lang = req.cookies.lang || 'en';

  // Передаем словарь в шаблоны
  if (lang === 'ru') {
    res.locals.t = ru;
    res.locals.lang = 'ru';
  } else {
    res.locals.t = en;
    res.locals.lang = 'en';
  }
  next();
});

// --- МАРШРУТЫ ---
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);

// --- ОБРАБОТКА ОШИБОК ---
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;