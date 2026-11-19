// Проверка, авторизован ли пользователь
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next(); // Пользователь есть, пропускаем дальше
    }
    // Если нет — перенаправляем на страницу входа
    res.redirect('/auth/login');
}

module.exports = requireAuth;