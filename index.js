//REQUIREMENTS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//FOLDERS
const locationController = require('./locations/locations.controller')

//PARAMETERS
require('dotenv').config();
const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(locationController);
//app.use(locationController);
app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})


