const express = require('express');
const mongoose = require('mongoose');
const locationController = require('./locations/locations.controller')
require('dotenv').config();
const userController = require('./users/user.controller');
const app = express()
const port = 3000
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/users', userController);
//app.use(locationController);
app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})


