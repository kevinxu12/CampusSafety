import React, { Component } from 'react'
import Card from './Card';
import axios from 'axios';
import { throwStatement } from '@babel/types';

const testData = [
    {name: "Maria", title: "hungry", description: "also hungry rn", location: "Towne" }, 
    {name: "Matt", title: "hungry", description: "hungry rn", location: "houston"}, 
    {name: "Randy", title: "Attacked avoid pls", description: "attacked!", location: "40th and locust"}]
class PendingRequests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: testData
        }
        this.acceptRequest = this.acceptRequest.bind(this);
    }
    async componentDidMount() {
        // sync with backend later
        const fetchedDataRaw = await axios.get('/api/getAllRequests');
        const fetchedData = fetchedDataRaw.data;
        this.setState({data: fetchedData})
    }

    acceptRequest(id) {
        console.log("accepting request");
        const obj = {
            _id: id
        }
        const response = axios.post('/api/acceptRequest', obj);
        this.setState({data: this.state.data.filter((entry) => {return entry._id != id})});
    }

    renderCards() {
        return this.state.data.map((request) => {
            console.log(request);
            return <Card data = {request} acceptRequest = {this.acceptRequest}/>
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