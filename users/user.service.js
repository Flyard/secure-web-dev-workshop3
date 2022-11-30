const User = require('./user.model');
const bcrypt = require('bcrypt');


async function register(username, password) {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({username, password: hash});
    return await user.save();
}

async function findByUsername() {
    try {
        return User.findOne({username: username});
    } catch(err) {
        console.error(err);
    }
}
module.exports = {
	register,
    findByUsername
};

