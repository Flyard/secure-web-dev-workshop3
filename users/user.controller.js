const router = require('express').Router();
const userService = require('./user.service');

router.post('/register', async(req, res) => {
    
    res.status(200).send(await userService.register(req.body?.username, req.body?.password));
})

router.get('/find/:username', async(req, res) => {
    res.status(200).send(await userService.findByUsername(req.param.username));
})

module.exports = router;