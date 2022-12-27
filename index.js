//REQUIREMENTS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require()
//FOLDERS
const locationController = require('./locations/locations.controller');
const userController = require('./user/users.controller');

//PARAMETERS
require('dotenv').config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(locationController);
app.use(userController);
//app.use(locationController);
app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})


