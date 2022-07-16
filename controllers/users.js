const user = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new user({
            email, username
        });
        const regdUser = await user.register(newUser, password);
        req.login(regdUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp ! ' + regdUser.username.toUpperCase());
            res.redirect('/campgrounds');
        }
        )
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}
module.exports.loginUser = async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}
