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

async function updateDocument(filter, update) {
    try {
        return Location.findOneAndUpdate(filter, update);
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function createDocument() {
        const newLocation = new Location();
        newLocation.filmType = req.body.filmType;
        newLocation.filmProducerName = req.body.filmProducerName;
        newLocation.endDate = req.body.endDate;
        newLocation.filmName = req.body.filmName;
        newLocation.district= req.body.district;
        newLocation.geolocation = req.body.geolocation;
        newLocation.sourceLocationId = req.body.sourceLocationId;
        newLocation.filmDirectorName = req.body.filmDirectorName;
        newLocation.address = req.body.address;
        newLocation.startDate = req.body.startDate;
        newLocation.year = req.body.year;

        try {
            newLocation.save();
            return console.log("location saved");
        } catch (err) {
            console.error(err);
            return null;
        }
        
}


module.exports = {
	findAll,
	querybyID,
	queryFilmName,
	deleteByID,
	updateDocument, 
    createDocument
};
