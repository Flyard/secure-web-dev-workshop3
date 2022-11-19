// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findAll () {
	return Location.find();
}

async function querybyID(_id) {
    try {
        return Location.findById( {_id}, null).orFail()
    } catch (err) {
        console.error(err);
        return null;
    }  
}


async function queryFilmName(filmName) {
    Location.find({filmName : filmName}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    }
    )
}

async function deleteByID(_id) {
    try {
        return Location.findByIdAndDelete( {_id}, null).orFail();
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function updateDocument(_id) {
    Location.findByIdAndUpdate(_id, {filmName : 'Hello World'},  (err, data) => {
        if(err){
            console.log(err);
        }
        else {
            console.log(data);
        }
    })
}



module.exports = {
	findAll,
	querybyID,
	queryFilmName,
	deleteByID,
	updateDocument
};
