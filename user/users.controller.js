const router = require('express').Router();
const userService = require('./user.service');
const passport = require('passport');
require('../strategy/local.strategy');
require('../strategy/jwt.strategy');


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
router.get('/users/:username', async(req, res) => {
    return res.status(200).send(await userService.findByUsername(req.params.username));
})


router.post('/users/login', 
    passport.authenticate('local', {
        session: false,
    }),
    async (req, res) => {
        const userId = req.body.username;
        const token = await userService.generate(userId);
        return res.status(200).send({token});
    });


router.get('/users', async(req, res) => {
    return res.status(200).send(await userService.findAll());
})    

router.route('/users/me')
    .get(async(req, res) => {
        console.log(req.body.username);
        return res.status(200).send(await userService.findByUsername(req.body.username))
    })
    .delete(async(req, res) => {
        return res.status(200).send(await userService.deleteUserByName(req.body.username))
    })

module.exports = router;