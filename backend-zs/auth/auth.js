const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user.model');

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        console.log('----test');
        const user = await UserModel.create({ email, password });
        console.log(user);
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    try {
        console.log(email);
        console.log(password);
        const user = await UserModel.findOne({ email });
        if ( !user ) {
            console.log('user not found');
            return done(null, false, { message: 'User not found' });
        }
        const validate = await user.isValidPassword(password);
        if ( !validate ) {
            return done(null, false, { message: 'Wrong Password' });
        }
        return done(null, user, { message: 'Logged in successfully' });
    } catch(error) {
        return done(error);
    }
}));

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTstrategy({
    secretOrKey: 'secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));
