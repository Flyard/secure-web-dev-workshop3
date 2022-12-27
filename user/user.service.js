const User = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findOne } = require('./users.model');
require('dotenv').config();

const salt = 10;

//CRUD

//CREATE

async function register(username, password) {
    try{
        if(username == null || password == null) {
            throw new Error("Wrong parameters");
        }
        const hash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username, 
            password: hash
        });

        return newUser;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function verify(username, password) {
    try {
        if(username == null || password == null) {
            throw new Error("Wrong parameters");
        }
        const currentUser = User.findOne({username: username});
        const match = await bcrypt.compare(password, currentUser.password);
        return match;
    } catch (err) {
        console.error(err);
        return null;
    }
}
//READ

async function findAll() {
    try {
        return User.find();
    } catch (err) {
        console.error(err);
        return null; 
    }  
}

async function findByUsername(username) {
    try{
        return User.findOne({username: username});
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function findId(id) {
    try {
        return User.findOne({id});
    } catch (err) {
        console.error(err);
        return null;
    }
}

//UPDATE
async function updateUser(id, filter) {
    try{
        if(filter.password) {
            const hash = await bcrypt.hash(filter.password, salt);
            filter.password = hash;
        }
        await User.findByIdAndUpdate({id}, filter);
        return await findOne(id);
    } catch (err) {
        return null;
    }
}
//DELETE
async function deleteUserById(id){
    try {
        return User.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
        return null;
    }
}
async function deleteUserByName(username) {
    try{
        return User.findOneAndDelete({username: username});
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function generate(id) {
    return jwt.sign({sub: id}, process.env.JWT_SECRET);
}

module.exports = {
    register,
    findAll,
    findByUsername,
    findId,
    updateUser,
    deleteUserById,
    deleteUserByName,
    verify, 
    generate
}