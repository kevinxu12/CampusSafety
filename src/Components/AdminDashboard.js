import React, { Component } from 'react'
import '../Style/AdminDashboard.css'
import Home from './Home'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import PendingRequests from './PendingRequests';
import Auth from '../Middleware/Auth'

class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'Home',
        }
    }
    

    deleteProfile() {
        console.log('deleting profile');
        var obj = {email: localStorage.getItem("email")};

        console.log(obj);

        Auth.delete(obj, (result) => {
            if (result === "success") {
                console.log("successfully deleted user");
                this.props.history.push({
                    pathname: '/'
                });
            } else {
                console.log("failed to delete user");
            }
        })
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
                <div class="wrapper">
                    <Navbar bg="primary" variant="dark">
                        <Navbar.Brand>Penn Safety</Navbar.Brand>
                        <Nav className="container-fluid">
                            <Nav.Link onClick={() => { this.setState({ currentPage: 'Home' }) }}>Home</Nav.Link>
                            <Nav.Link href="#features">Map</Nav.Link>
                            <Nav.Link onClick={() => { this.setState({ currentPage: 'Pending Requests' }) }}>Pending Requests</Nav.Link>
                            <Nav.Link href="#pricing">Accepted Requests</Nav.Link>
                            <Nav.Item className="ml-auto">
                                <Button className="button" variant="outline-light" onClick={() => {this.deleteProfile()}}> Delete Profile </Button>
                                <Button className="button" variant="outline-light"> Log Out</Button> 
                            </Nav.Item>
                            
                        </Nav>
                    </Navbar>
                    <div className="content">
                        {this.renderMainPage()}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;