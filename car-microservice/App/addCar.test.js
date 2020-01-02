const addCar = require('./routes/addCar');
const changeCarLocation = require('./routes/changeCarLocation');
const cars = require('./model/car.js');

test('addCar() test', async () => {

	let newCarID = await addCar("TEST_ADD_CAR", "TEST_ADD_CAR");

	let testCarID = await cars.findAll({
		where: {
			carName: "TEST_ADD_CAR"
		}
	});

	expect(newCarID).toBe(testCarID[0].carID);

	let d = await cars.destroy({
		where: {
			carID: testCarID[0].carID
		}
	});

});

test('changeCarLocation() test', async () => {
	let allCars = await cars.findAll({
		where: {
			carID: 1
		}
	});

	console.log("Przed zmiana: ");
	console.log(allCars[0].dataValues);

	await changeCarLocation(allCars[0].dataValues.carName, "Warszawa");

	let allCars2 = await cars.findAll({
		where: {
			carID: 1
		}
	});

	console.log("Po zmianie: ");
	console.log(allCars2[0].dataValues);

	expect(allCars2[0].dataValues.carPosition).toBe("Warszawa");

	await changeCarLocation(allCars[0].dataValues.carName, allCars[0].dataValues.carPosition);
});