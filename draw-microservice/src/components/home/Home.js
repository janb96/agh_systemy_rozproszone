import React, {Component} from 'react';
import axios from 'axios';
import vis from 'vis-network';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            edges: [],
            nodes: [],
            backendData: []
        };
    }

    async getGraph() {
        //Wykonujesz zapytanie na backend
        const promise = await axios.get('http://localhost:4000/getGraph');
        //Wyciagasz dane z response od backendu
        const response = promise.data;
        
        //Podbijasz stan aplikacji
        this.setState({
            backendData: response,
        });

        return response;
    }

    async componentDidMount() {

        let nodes, edges, network;

        nodes = new vis.DataSet();

        // Wywolujesz getGraph (await jest zeby czekac na wynik, poczytaj sobie o async i await)

        let getGraphDataResponse = await this.getGraph();
        //Drukujesz sobie i sprawdzasz czy rzeczywiscie zaktualizowano state
        console.log(this.state.backendData);


        function turnToArray() {
            return Array.from(arguments);
        } //funkcja zamieniająca przesłąne argumenty do tablicy

        let arrayFromBackend = turnToArray(getGraphDataResponse); //zamiana danych z backendu do tablicy

        let i = 1;
        for (let key in getGraphDataResponse){
            nodes.add([{id: i.toString(), label: key}]);
            i++;
        }

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
