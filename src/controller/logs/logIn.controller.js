import passport from 'passport';
import '../../routes/middleware/index.js'

// -------------------------------
async function login(req, res) {
    await res.render('login')
}

async function loginError(req, res) {
    await res.render('logInErr');
}


function logout(req, res, next) {
    req.logout(function(err) {
    if (err) { return next(err); }
    // console.log('disconnected');
    res.redirect('/');
  });
};

const loginPost =
    await passport.authenticate('local-login',
        {
            successRedirect: '/home',
            failureRedirect: '/login'
        }
    );

// -------------------------------
export {
    login,
    loginPost,
    loginError,
    logout
}; // to index