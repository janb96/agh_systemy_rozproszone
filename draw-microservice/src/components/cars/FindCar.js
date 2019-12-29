import React, {Component} from 'react';
import axios from 'axios';
import vis from 'vis-network';
import swal from 'sweetalert';

class FindCar extends Component {

    constructor() {
        super();
        this.state = {
            carName: "",
            destination: "",
            possibleLocations: [],
            message: null
        };
        this.handleCarNameChange = this.handleCarNameChange.bind(this);
        this.handleCarPositionChange = this.handleCarPositionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCarNameChange(event) {
        this.setState({carName: event.target.value});
    }

    handleCarPositionChange(event) {
        this.setState({destination: event.target.value});
    }

    async handleSubmit(event) {
        let url = "http://localhost:5000/findClosestCar/" + this.state.destination;
        url = encodeURI(url);
        console.log(url);
        let promise = await axios.get(url);
        this.setState({carName: promise.data.carName});
        let name = promise.data.carName;
        let distance = promise.data.cost;
        swal("Najbliższa ekipa to: " + name, "Z kosztem dojazdu: " + distance);
        let m = <div className="alert alert-success"><strong>Najbliższa ekipa to:</strong> {name} <strong>z kosztem dojazdu:</strong> {distance}</div>
        this.setState({message: m});
    }

    async getPossibleLocations() {
        const promise = await axios.get('http://localhost:4000/getGraph');
        const response = promise.data;
        return response;
    }

    async componentDidMount() {
        let posLoc = await this.getPossibleLocations();

        let arr = [];
        let counter = 0;

        for (let e in posLoc) {
            if(counter === 0) {
                this.setState({destination: e});
            }
            counter++;
            let element = <option value={e}>{e}</option>;
            let pl = this.state.possibleLocations;
            pl.push(element);
            arr = pl;
            this.setState({possibleLocations: arr});
        }

    }

    render() {
        return (
            <div>
                <h2>Znajdź najbliższą ekipe: </h2>
                <div>Wybierz miejsce do którego chcesz wysłać ekipę ratunkową</div>
                <select className="form-control" value={this.state.destination} onChange={this.handleCarPositionChange}>
                    {this.state.possibleLocations}
                </select>
                <button onClick={this.handleSubmit} type="button" className="btn btn-success btn-lg">
                    Znajdź najbliższą ekipe
                </button>
                <div>
                    {this.state.message}
                </div>
            </div>

        );
    }
}

export default FindCar;
