import React, { Component } from 'react';
import axios from 'axios';
import vis from 'vis-network';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            edges: [],
            nodes: []
        };
    }

    async getGraph() {
        const promise = await axios.get('http://localhost:4000/getGraph');
        const response = promise.data;
        console.log(response);
        return response;
    }

    componentDidMount() {

        let nodes, edges, network;

        nodes = new vis.DataSet();
        console.log(this.getGraph());
        nodes.add([
            { id: "1", label: "Warszawa" },
            { id: "2", label: "Kraków" },
            { id: "3", label: "Gdańsk" },
            { id: "4", label: "Katowice" },
            { id: "5", label: "Poznań" }
        ]);

        edges = new vis.DataSet();

        edges.add([
            { id: "1", from: "1", to: "2" },
            { id: "2", from: "1", to: "3" },
            { id: "3", from: "2", to: "4" },
            { id: "4", from: "2", to: "5" }
        ]);

        let container = document.getElementById("mynetwork");

        let data = {
            nodes: nodes,
            edges: edges
        };

        let options = {};

        network = new vis.Network(container, data, options);
    }

    render() {
        return (
            <div className="container">
                <h1>Graph</h1>
                <div id="mynetwork"></div>
            </div>
        );
    }
}

export default Home;
