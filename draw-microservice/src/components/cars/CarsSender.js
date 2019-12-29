import React, {Component} from 'react';
import axios from 'axios';
import vis from 'vis-network';
import swal from 'sweetalert';

class CarsSender extends Component {

    constructor() {
        super();
        this.state = {
            carName: "",
            carPosition: "",
            possibleLocations: [],
            allCars: []
        };
        this.handleCarNameChange = this.handleCarNameChange.bind(this);
        this.handleCarPositionChange = this.handleCarPositionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCarNameChange(event) {
        this.setState({carName: event.target.value});
    }

    handleCarPositionChange(event) {
        this.setState({carPosition: event.target.value});
    }

    async handleSubmit(event) {
        let url = "http://localhost:5000/changeCarLocation/" + this.state.carName + "/" + this.state.carPosition;
        url = encodeURI(url);
        const promise = await axios.get(url);
        promise.then(
            swal("Wysłano ekipę: " + this.state.carName + " do: " + this.state.carPosition)
        );
        
    }

    async getPossibleLocations() {
        const promise = await axios.get('http://localhost:4000/getGraph');
        const response = promise.data;
        return response;
        //this.setState({possibleLocations: arr});
    }

    async getCars() {
        const promise = await axios.get('http://localhost:5000/getCars');
        const response = promise.data;
        return response;
        //this.setState({possibleLocations: arr});
    }

    async componentDidMount() {
        let posLoc = await this.getPossibleLocations();

        let arr = [];
        let counter = 0;
        for (let e in posLoc) {
            if(counter === 0) {
                this.setState({carPosition: e});
            }
            counter++;
            let element = <option value={e}>{e}</option>;
            let pl = this.state.possibleLocations;
            pl.push(element);
            arr = pl;
            this.setState({possibleLocations: arr});
        }

        counter = 0;

        let posCar = await this.getCars();
        for(let i = 0; i < posCar.length; i++) {
            if(counter === 0) {
                this.setState({carName: posCar[i].carName});
            }
            counter++;
            let element = <option value={posCar[i].carName}>{posCar[i].carName}</option>
            let pc = this.state.allCars;
            pc.push(element);
            arr = pc;
            this.setState({allCars: arr});
        }

        console.log(this.state.allCars);

    }

    render() {
        return (
            <div>
                <h2>Wysyłanie pojazdu</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>Wybierz ekipę ratunkową do wysłania: {this.state.carName}</div>
                    <select className="form-control" value={this.state.carName} onChange={this.handleCarNameChange}>
                        {this.state.allCars}
                    </select>
                    <div>Wybierz miejsce do którego chcesz wysłać ekipę ratunkową</div>
                    <select className="form-control" value={this.state.carPosition} onChange={this.handleCarPositionChange}>
                        {this.state.possibleLocations}
                    </select>
                    <button type="submit" className="btn btn-success btn-lg">
                        Wyślij pojazd
                    </button>
                </form>
            </div>

        );
    }
}

export default CarsSender;
