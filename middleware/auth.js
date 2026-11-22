// 10.8: Middleware для закрытия страниц для незалогиненного пользователя
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
}

module.exports = requireAuth;