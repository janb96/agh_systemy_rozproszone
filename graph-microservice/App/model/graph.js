var dijkstrajs = require('dijkstrajs');
var graph_library = require('graph');

class Graph {

	constructor() {
		this.graph = new graph_library.Graph();
	}

	add(verticle1, verticle2, weight) {
		let result = this.graph.set(verticle1, verticle2, weight);
		return result;
	}

	delEdge(verticle1, verticle2) {
		return this.graph.del(verticle1,verticle2);
	}

	getAll() {
		return this.graph._graph;
	}

	findClosestPath(veticle1, verticle2) {
		return dijkstrajs.find_path(this.getAll(), veticle1, verticle2);
	}

	getPathCost(path) {
		let cost = 0;
		while(path.length > 1) {
			let verticle = path.shift();
			cost += this.graph.get(verticle, path[0]);
		}
		return cost;
	}

	getNumberOfEdges() {
		return this.graph.size();
	}

	getNumberOfVerticles() {
		return this.graph.order();
	}

	getDegree(verticle1) {
		return this.graph.degree(verticle1);
	}

}

module.exports = Graph;