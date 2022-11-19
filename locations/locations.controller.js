// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/locations', async (req, res) => {
	return res.status(200).send(await locationsService.findAll())
})


router.get('/locations/:id', async (req, res) => { //working
	return res.status(200).send(await locationsService.querybyID(req.params.id));
})

router.delete('/locations/:id', async(req, res) => { //working
	return res.status(200).send(await locationsService.deleteByID(req.params.id));
})




module.exports = router
