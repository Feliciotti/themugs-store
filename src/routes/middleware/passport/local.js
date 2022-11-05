import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../../../models/index.js';

// -------------------------------

const LocalStrategy = Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
});

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) =>{
        const user = await User.findOne({email: email})

        if(!user){
            return done(null, false, console.log('user not found'));
        }
        if(!user.comparePassword(password)) {
            return done(null, false, console.log('incorrect password'))
        }

        if(user.tokenConfirm == false){
            return done(null, false, console.log('account not verified'));
        }

        return done(null, user);
    })
);

