const passport = require('passport');


//const { ExtractJwt, Strategy } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(
    'register',
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password', session: false },
        async (email, password, done) => {
            try {
                const user = await User.findOne({
                    email
                });

                if (!user) {
                    const createUser = await User.create({ email, password });
                    return done(null, createUser);
                }
                else {
                    return done(null, false, { message: 'Email taken!' });
                }
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            password: 'password'
        },
        async (email, password, done) => {
            try {
                console.log(email)
                const user = await User.findOne({
                    email
                });

                console.log(user)
                if (user) {
                    const response = await bcrypt.compare(password, user.password);
                    if (response != true) {
                        return done(null, false, { message: 'Passwords do not match' });
                    }
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid email' });
                }
            } catch (err) {
                done(err);
            }
        }
    )
);

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'keyboardcat'
}

passport.use(
    'jwt',
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findOne({
                email: jwt_payload.id,
            });
            if (user) {
                console.log('User found in database');
                done(null, user);
            } else {
                console.log('User not found in database');
                done(null, false, { message: 'User does not exist' });
            }
        } catch (err) {
            console.log(err)
            done(err);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
