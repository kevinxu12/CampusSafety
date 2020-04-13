import React, { Component } from 'react'
import Card from './Card';
import axios from 'axios';
import { throwStatement } from '@babel/types';

class PendingRequests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.acceptRequest = this.acceptRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
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
        axios.post('/api/acceptRequest', obj);
        this.setState({data: this.state.data.filter((entry) => {return entry._id != id})});
    }

    rejectRequest(id) {
        console.log("rejecting request");
        const obj = {
            _id: id
        }
        axios.post('/api/rejectRequest', obj);
        this.setState({data: this.state.data.filter((entry) => {return entry._id != id})});
    }

    renderCards() {
        return this.state.data.map((request) => {
            console.log(request);
            return <Card data = {request} acceptRequest = {this.acceptRequest} rejectRequest = {this.rejectRequest}/>
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