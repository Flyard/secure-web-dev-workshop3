const User = require('./user.model');
const bcrypt = require('bcrypt');
const passport = require('passport');


async function createUser(username, password) {
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await new User({username, password: hash});
        console.log(`[+] Added user : ${username}:${password}`);
        return user;

    } catch (err) {
        console.log("Not created");
        return null;
    }

}


async function findAll() {
    try {
        return User.find({}).select('username');
    } catch (err) {
        console.log("Not found");
        console.error(err);
        return false;
    }
}

async function findUser(id) {
    try {
        return await User.findOne({id});
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function checkUser(username) {
    try {
        return await User.findOne({username});
    } catch (err) {
        console.log("[!] Error");
        console.error(err);
        return null;
    }
}

async function updateUser(id, property) {
    try {
        if (property.role) delete property.role;
        await User.findOneAndUpdate({id}, property);
        return await getUser(id);
    } catch (err) {
        console.log("[!] Error");
        console.error(err);
        return null;
    }
}

async function deleteUser(id) {
    try {
        return await User.findOneAndDelete({_id:id});
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function verify(username, password) {
    try {
        const user = await User.findOne({username});
        const match = await bcrypt.compare(password, user.password);
        return match;
    } catch (err) {
        console.log("Wrong credentials");
        console.error(err);
        return null;
    }
}

async function tokenGen(username) {
    return jwt.sign({sub:username}, process.env.JWT_SECRET);
}

module.exports = {
    createUser,
    findAll,
    findUser,
    checkUser,
    updateUser,
    deleteUser,
    verify, 
    tokenGen
};

