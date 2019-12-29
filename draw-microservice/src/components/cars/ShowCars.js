import React, {Component} from 'react';
import axios from 'axios';
import vis from 'vis-network';

class ShowCars extends Component {

    constructor() {
        super();
        this.state = {
            allCars: []
        };
    }

    async getCars() {
        const promise = await axios.get('http://localhost:5000/getCars');
        const response = promise.data;
        return response;
    }

    async componentDidMount() {

        let posCar = await this.getCars();
        let arr = [];

        for(let i = 0; i < posCar.length; i++) {
            let element = 
            <div class="alert alert-success">
                <div><strong>Nazwa ekipy:</strong> {posCar[i].carName} <strong>Lokalizacja ekipy:</strong> {posCar[i].carPosition}</div>
            </div>
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
                <h2>Dostępne pojazdy:</h2>
                <div>{this.state.allCars}</div>
            </div>

        );
    }
}

export default ShowCars;
