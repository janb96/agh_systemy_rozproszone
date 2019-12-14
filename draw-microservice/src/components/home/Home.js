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

        for (let key in getGraphDataResponse){
            nodes.add([{id: key, label: key}]);
        }

        edges = new vis.DataSet();

        /*for(let key in getGraphDataResponse){
            for(let key in value){

            }
        }*/

        edges.add([
            { id: "a", from: "a", to: "b" },
            { id: "b", from: "b", to: "c" },
            { id: "c", from: "c", to: "d" },
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
