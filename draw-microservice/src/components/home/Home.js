import React, {Component} from 'react';
import axios from 'axios';
import vis from 'vis-network';
import CarsSender from './../cars/CarsSender';
import ShowCars from './../cars/ShowCars';
import FindCar from './../cars/FindCar';
import Graph from './../graph/Graph';

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
        //console.log(this.state.backendData);


        function turnToArray() {
            return Array.from(arguments);
        } //funkcja zamieniająca przesłąne argumenty do tablicy

        console.log(getGraphDataResponse);

        let arrayFromBackend = turnToArray(getGraphDataResponse); //zamiana danych z backendu do tablicy


        for (let key in getGraphDataResponse){
            nodes.add([{id: key, label: key}]);
        }

        edges = new vis.DataSet();

        let i_edges = 1;

        let usedElements = new Array();

        for ( let element in getGraphDataResponse) {
            let index = element.toString();
            let subArray = getGraphDataResponse[index];
            let miniArray = [];
            for ( let e in subArray) {
                let e_index = e.toString();
                let weight = subArray[e_index];

                console.log(weight);

                miniArray.push(e_index);
                usedElements[index] = miniArray;

                let flag = true;

                if(usedElements[e_index]) {
                    if(usedElements[e_index].includes(index)){
                        flag = false;
                    }
                } else {
                    flag = true
                }

                if(flag) {
                    edges.add([{ id: i_edges.toString(), from: index, to: e_index, value: weight, label: weight.toString(), font: { align: "middle" }}]);
                    i_edges++;
                }

            }

        }

        console.log(usedElements);

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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div id="mynetwork"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <CarsSender/>
                    </div>
                    <div className="col-4">
                        <FindCar/>
                    </div>
                    <div className="col-4">
                        <ShowCars/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
