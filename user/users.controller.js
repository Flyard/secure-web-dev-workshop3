const router = require('express').Router();
const userService = require('./user.service');
const passport = require('passport');

router.post('/users/register', async(req, res) => {
    if(req.body.username == null || req.body.password == null) {
        return res.status(400).send("Wrong parameters.");
    }
    const{username, password} = req.body;
    const newUser = await userService.register(username, password);
    if(newUser) {
        return res.status(200).send(newUser);
    } else {
        return res.status(400).send("Request failed. User already exists");
    }
    
})

router.post('/users/login', 
    passport.authenticate('local', {
        session: false,
    }),
    async (req, res) => {
        const userId = req.user?._id;
        const token = await usersService.generateJWT(userId);
        return res.status(200).send({token});
    });

    router.use('/users/me',passport.authenticate('jwt', {
        session:false, failureRedirect:'/users/login'
    }));

    
module.exports = router;