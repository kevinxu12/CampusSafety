import React, { Component } from 'react'
import './AdminDashboard.css'
import Home from './Home'
import PendingRequests from './PendingRequests';
class AdminDashboard extends Component {
    state = {
        currentPage: 'Home'
    }

    renderMainPage() {
        console.log(this.state);
        if (this.state.currentPage === 'Home') {
            return <Home />
        } else if (this.state.currentPage === 'Pending Requests') {
            return <PendingRequests />
        }
    }
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="sidebar">
                        <h2>Navigation</h2>
                        <ul>
                            <li onClick={() => { this.setState({ currentPage: 'Home' }) }}><i className="fas fa-home"></i>Home</li>
                            <li><i className="fas fa-map"></i>Map</li>
                            <li onClick={() => { this.setState({ currentPage: 'Pending Requests' }) }}><i className="fas fa-pending-requests"></i>Pending Requests </li>
                            <li><i className="fas fa-accepted-requests"></i>Accepted Requests</li>
                        </ul>
                    </div>
                    <div className="content">
                        {this.renderMainPage()}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;