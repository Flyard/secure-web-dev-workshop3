const passport = require('passport');
const User = require('../user/users.model');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

passport.use(new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: process.env.JWT_SECRET
    }, 
    (jwt_payload, done) => {
        User.findOne({_id: jwt_payload.sub}, (err, user) => {
            if(err) {return done(err, false)}
            if(user) {return done(null, user)}
        });
        return done(null, false);
    }
))

module.exports = passport;