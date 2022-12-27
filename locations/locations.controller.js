const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/locations', async (req, res) => {
	return res.status(200).send(await locationsService.findAll())
})


router.get('/locations/:id', async (req, res) => { //working
	return res.status(200).send(await locationsService.querybyID(req.params.id));
})

router.delete('/locations/delete/:id', async(req, res) => { //working
	return res.status(200).send(await locationsService.deleteByID(req.params.id));
})

router.patch('/locations/update/:filter/:update', async(req, res) => {
	return res.status(200).send(await locationsService.updateDocument(req.params.filter, req.params.update));
})
 
router.post('/locations/create', async(req, res) => {
	return res.status(200).send(await locationsService.createDocument());
})


module.exports = router
