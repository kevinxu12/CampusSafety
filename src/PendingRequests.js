import React, { Component } from 'react'
import Card from './Card';
import axios from 'axios';

const testData = [
    {name: "Maria", title: "hungry", description: "also hungry rn", location: "Towne" }, 
    {name: "Matt", title: "hungry", description: "hungry rn", location: "houston"}, 
    {name: "Randy", title: "Attacked avoid pls", description: "attacked!", location: "40th and locust"}]
class PendingRequests extends Component {
    state = {
        data: testData
    }
    async componentDidMount() {
        // sync with backend later
        const fetchedDataRaw = await axios.get('/api/getAllRequests');
        const fetchedData = fetchedDataRaw.data;
        this.setState({data: fetchedData})
    }

    renderCards() {
        return this.state.data.map((request) => {
            return <Card data = {request}/>
        })
    }
    render () {
        return (
            <div>
                <h1> Pending Requests</h1>
                {this.renderCards()}
            </div>
        )
    }
}

export default PendingRequests;