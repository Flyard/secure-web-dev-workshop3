const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    
    password: {
        type: String,
        required: true,
        //select: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
