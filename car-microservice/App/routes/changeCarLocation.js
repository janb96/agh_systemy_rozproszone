let cars = require('./../model/car.js');

async function changeCarLocation(carName, newLocation) {

		let status = await cars.update(
		    { 
		    	carPosition: newLocation 
		    },
		    { where: 
		    	{ 
		    		carName: carName 
		    	} 
		    }
		);

		return status;

}

module.exports = changeCarLocation;