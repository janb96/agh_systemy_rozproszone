let cars = require('./../model/car.js');

async function addCar(carName, carPosition) {

	const car = {
		carPosition: carPosition,
		carName: carName
	};

	let status = await cars.create(car);
	status = status.dataValues.carID;
	return status;

}

module.exports = addCar;