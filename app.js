var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');
var bonusesRouter = require('./routes/bonuses');
var authRouter = require('./routes/auth'); // <-- Подключили auth

var app = express();

// --- ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.log('❌ MongoDB connection error. Details:', err.message));

// --- НАСТРОЙКА ШАБЛОНИЗАТОРА ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// --- СТАНДАРТНЫЕ MIDDLEWARE ---
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- НАСТРОЙКА СЕССИЙ ---
app.use(session({
  secret: process.env.SESSION_SECRET || 'casino_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// --- НАСТРОЙКА ЯЗЫКОВ (i18n) ---
var en = require('./locales/en');
var ru = require('./locales/ru');

app.use(function(req, res, next) {
  var lang = req.cookies.lang || 'en';
  if (lang === 'ru') {
    res.locals.t = ru;
    res.locals.lang = 'ru';
  } else {
    res.locals.t = en;
    res.locals.lang = 'en';
  }
  // Передаем пользователя во все шаблоны
  res.locals.user = req.session.user || null;
  next();
});

// --- МАРШРУТЫ ---
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/bonuses', bonusesRouter);
app.use('/auth', authRouter); // <-- Подключили auth

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;