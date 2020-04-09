import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Marker from './../Middleware/Marker'


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            title: '',
            description: '',
            location: '',
            latitude: '',
            longitude: '',
            validPost: ''
        }
    }

    handleFirstname = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }

    handleLastname = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }

    handleTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleLocation = (event) => {
        this.setState({
            location: event.target.value
        })
    }

    handleLatitude = (event) => {
        this.setState({
            latitude: event.target.value
        })
    }

    handleLongitude = (event) => {
        this.setState({
            longitude: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var obj = {title: this.state.title, description: this.state.description, location: this.state.location, firstname: this.state.firstname, lastname: this.state.lastname, latitude: this.state.latitude, longitude: this.state.longitude};
        Marker.adminPost(obj, (result) => {
            if (result === "success") {
                this.setState({
                    validPost: "valid",
                    firstname: '',
                    lastname: '',
                    title: '',
                    description: '',
                    location: '',
                    latitude: '',
                    longitude: ''
                })
            } else {
                this.setState({
                    validPost: "invalid"
                })
            }
        })


    }


    render () {
        let alert;
        if (this.state.validPost === "valid") {
            alert = <Alert variant="success"> Post successfully submitted! </Alert>
        } else if (this.state.validPost === "invalid") {
            alert = <Alert variant="danger"> Unsuccessful post. Please try again. </Alert>
        }


        return (
            <div>
                <div> 
                {alert}
                </div>
                <div class="container">
                    <Container fluid="lg">
                        <h1 class="sign-in"> Submit Post</h1>
                        <div class="card-container">
                            <div class="card">
                                <Form onSubmit = {this.handleSubmit}>
                                    <Form.Group controlId="formTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control value={this.state.title} type="title" placeholder="Title" onChange = {this.handleTitle}/>
                                    </Form.Group>
                                    <Form.Group controlId="formDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control value={this.state.description} type="description" placeholder="Description" onChange = {this.handleDescription}/>
                                    </Form.Group>
                                    <Form.Group controlId="formLocation">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control value={this.state.location} type="location" placeholder="Location" onChange = {this.handleLocation}/>
                                    </Form.Group>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control value={this.state.firstname} type="firstname" placeholder="First Name" onChange = {this.handleFirstname}/> 
                                    </Form.Group>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control value={this.state.lastname} type="lastname" placeholder="Last Name" onChange = {this.handleLastname}/>
                                    </Form.Group>
                                    <Form.Group controlId="formLatitude">
                                        <Form.Label>Latitude</Form.Label>
                                        <Form.Control value={this.state.latitude} type="latitude" placeholder="Latitude" onChange = {this.handleLatitude}/>
                                    </Form.Group>
                                    <Form.Group controlId="formLongitude">
                                        <Form.Label>Longitude</Form.Label>
                                        <Form.Control value={this.state.longitude} type="longitude" placeholder="Longitude" onChange = {this.handleLongitude}/>
                                    </Form.Group>
                                    <div class="button">
                                        <Button variant="primary" type="submit">
                                            Submit Post
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home;