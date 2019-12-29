import React, {Component} from 'react';
import axios from 'axios';
import vis from 'vis-network';

class Graph extends Component {

    constructor() {
        super();
        this.state = {
            edges: []
        };
    }

    async componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>Graph</div>
            </div>

        );
    }
}

export default Graph;
