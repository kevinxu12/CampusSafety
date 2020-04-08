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

    signOut() {
        console.log('signing out');
        localStorage.removeItem("email");
        this.props.history.push({
            pathname: '/'
        });
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
                    <Navbar className="navbar" bg="primary" variant="dark">
                        <Navbar.Brand className="navbar-title">Penn Safety</Navbar.Brand>
                        <Nav className="container-fluid">
                            <Nav.Link onClick={() => { this.setState({ currentPage: 'Home' }) }}>Home</Nav.Link>
                            <Nav.Link href="#features">Map</Nav.Link>
                            <Nav.Link onClick={() => { this.setState({ currentPage: 'Pending Requests' }) }}>Pending Requests</Nav.Link>
                            <Nav.Link href="#pricing">Accepted Requests</Nav.Link>
                            <Nav.Item className="ml-auto">
                            <div class="button-container">
                                <Button className="button" variant="outline-light" onClick={() => {this.deleteProfile()}}> Delete Profile </Button>
                                <Button className="button" variant="outline-light" onClick={() => {this.signOut()}}> Log Out</Button> 
                            </div>


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