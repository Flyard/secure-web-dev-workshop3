const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../user/users.model');
const usersService = require('../user/user.service');

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({username: username}, async (err, user) => {
            if(err) {return done(err);}
            if(!user) {
                console.log("User not found");
                return done(null, false);
            }
            if(!usersService.verify(username, password)) {
                console.log('Wrong passsword');
                return done(null, false);
            }
            if(usersService.verify(username, password)) {
                console.log("[-] You're logged in!");
                return done(null, user);
            }
            
        });
    }
));

module.exports = passport;