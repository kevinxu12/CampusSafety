import React, { Component } from 'react'
import Card from './Card';
import axios from 'axios';


class AcceptedRequests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    async componentDidMount() {
        // sync with backend later
        const fetchedDataRaw = await axios.get('/api/getAllAlerts');
        const fetchedData = fetchedDataRaw.data;
        this.setState({data: fetchedData})
    }

    renderCards() {
        return this.state.data.map((request) => {
            console.log(request);
            return <Card data = {request} acceptRequest = {this.acceptRequest} isAccepted = {true}/>
        })
    }
    render () {
        return (
            <div>
                <h1>Alerts</h1>
                {this.renderCards()}
            </div>
        )
    }
}

export default AcceptedRequests;