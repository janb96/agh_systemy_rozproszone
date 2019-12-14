var express = require('express');
var router = express.Router();
let edges = require('./../model/graphDatabase.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/getClosestPath/:v1/:v2', function(req, res, next) {

	const v1 = req.params.v1;
	const v2 = req.params.v2;

	let response = g.findClosestPath(v1, v2);

	if(!Array.isArray(response)) {
		response = "path_unknown";
	}

  	res.send(response);
});

router.get('/getClosestPathCost/:v1/:v2', function(req, res, next) {

	let response = "path_unknown";

	const v1 = req.params.v1;
	const v2 = req.params.v2;

	let path = g.findClosestPath(v1, v2);
	
	if(Array.isArray(path)){
		let pathCost = g.getPathCost(path);
		response = pathCost.toString();
	}

  	res.send(response);
});

router.get('/add/:v1/:v2/:weight', function(req, res, next) {

	const v1 = req.params.v1;
	const v2 = req.params.v2;
	const weight = parseInt(req.params.weight);

	const edge = {
		start: v1,
	  	end: v2,
	  	weight: weight
	};

	edges.create(edge);

	console.log(v1);
	console.log(v2);
	console.log(weight);

	let status = g.add(v1, v2, weight);


	console.log(g.getAll());

  	res.send(status.toString());
});

router.get('/getGraph', function(req, res, next) {

	let graph_matrix = g.getAll();
  	res.send(graph_matrix);

});


module.exports = router;
