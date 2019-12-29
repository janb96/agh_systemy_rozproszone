var express = require('express');
var router = express.Router();
let cars = require('./../model/car.js');
const Sequelize = require('sequelize');
const axios = require('axios')
const Op = Sequelize.Op;

router.get('/addCar/:carName/:carPosition', async function(req, res, next) {

	const carPosition = req.params.carPosition;
	const carName = req.params.carName;

	const car = {
		carPosition: carPosition,
		carName: carName
	};

	let status = await cars.create(car);

  	res.send(status);
});

router.get('/getCars', async function(req, res, next) {

	let allCars = await cars.findAll();

  	res.send(allCars);
});

router.get('/changeCarLocation/:cName/:newLocation', async function(req, res, next) {

	const newLocation = req.params.newLocation;
	const cName = req.params.cName;

	console.log(newLocation);
	console.log(cName);

	let response = await cars.update(
	    { 
	    	carPosition: newLocation 
	    },
	    { where: 
	    	{ 
	    		carName: cName 
	    	} 
	    }
	);

  	res.send(response);
});

router.get('/findClosestCar/:v2', async function(req, res, next) {

	let allCars = await cars.findAll();

	const v2 = req.params.v2;

	let costs = [];

	let bar = new Promise((resolve, reject) => {

		allCars.forEach( async(params) => {
			let carPosition = params.carPosition;
			let url = "http://localhost:4000/getClosestPathCost/" + carPosition + "/" + v2;
			url = encodeURI(url);
			let pathCost = await axios.get(url);
			const cost = {
				carID: params.carID,
				carName: params.carName,
				currentPosition: carPosition,
				cost: pathCost.data
			}
			costs.push(cost);
			
			if (costs.length === allCars.length) {
				resolve();
			}
		});

	});

	bar.then( () => {
		let max = Infinity;
		let closestCar = null;
		let counter = 1;

		let bar2 = new Promise( (resolve, reject) => {

			costs.forEach( async(params) => {
				if(params.cost <= max) {
					max = params.cost;
					closestCar = params;
				}
				if (counter === allCars.length) {
					resolve();
				}
				counter++;
			});
		});

		bar2.then( () => {
			res.send(closestCar);
		})

	});

});

module.exports = router;
