import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Marker from './../Middleware/Marker'
import Broadcast from './../Middleware/Broadcast'
import axios from 'axios'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            posttitle: '',
            postdescription: '',
            email: localStorage.getItem("email"),
            location: '',
            latitude: '',
            longitude: '',
            validPost: '',
            title: '',
            description: '',
            author: '',
            validBroadcast: '',
            requestMade: 0,
            requestAccepted: 0,
            requestRejected: 0
        }
    }
    async componentDidMount() {
        const response = await axios.get('/api/getAnalytics');
        console.log(response);
        const data = response.data[0];
        this.setState({
            requestMade: data.requestMade,
            requestAccepted: data.requestAccepted,
            requestRejected: data.requestRejected
        })
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

    handlePostTitle = (event) => {
        this.setState({
            posttitle: event.target.value
        })
    }

    handlePostDescription = (event) => {
        this.setState({
            postdescription: event.target.value
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

    handleAuthor = (event) => {
        this.setState({
            author: event.target.value
        })
    }

    handleBroadcastSubmit = (event) => {
        event.preventDefault();

        var obj = { title: this.state.title, description: this.state.description, author: this.state.author };
        Broadcast.makebroadcast(obj, (result) => {
            if (result === "success") {
                this.setState({
                    validBroadcast: "valid",
                    title: '',
                    description: '',
                    author: ''
                })
            } else {
                this.setState({
                    validBroadcast: "invalid"
                })
            }
        })


    }

    handlePostSubmit = (event) => {
        event.preventDefault();

        var obj = { posttitle: this.state.posttitle, postdescription: this.state.postdescription, email: this.state.email, location: this.state.location, firstname: this.state.firstname, lastname: this.state.lastname, latitude: this.state.latitude, longitude: this.state.longitude };
        Marker.adminPost(obj, (result) => {
            if (result === "success") {
                this.setState({
                    validPost: "valid",
                    firstname: '',
                    lastname: '',
                    posttitle: '',
                    postdescription: '',
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


    render() {
        let alert;
        let alertBroadcast;
        if (this.state.validPost === "valid") {
            alert = <Alert variant="success"> Post successfully submitted! </Alert>
        } else if (this.state.validPost === "invalid") {
            alert = <Alert variant="danger"> Unsuccessful post. Please try again. </Alert>
        }

        if (this.state.validBroadcast === "valid") {
            alertBroadcast = <Alert variant="success"> Broadcast successfully submitted! </Alert>
        } else if (this.state.validBroadcast === "invalid") {
            alertBroadcast = <Alert variant="danger"> Unsuccessful broadcast. Please try again. </Alert>
        }

        return (
            <div>
                <div>
                    {alert}
                </div>
                <div>
                    {alertBroadcast}
                </div>
                {/* for making a marker */}
                <div class="container">
                    <Container fluid="lg">
                        <h1 class="sign-in"> Submit Post</h1>
                        <div class="card-container">
                            <div class="card">
                                <Form onSubmit={this.handlePostSubmit}>
                                    <Form.Group controlId="formPostTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control value={this.state.posttitle} type="posttitle" placeholder="Title" onChange={this.handlePostTitle} />
                                    </Form.Group>
                                    <Form.Group controlId="formPostDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control value={this.state.postdescription} type="postdescription" placeholder="Description" onChange={this.handlePostDescription} />
                                    </Form.Group>
                                    <Form.Group controlId="formLocation">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control value={this.state.location} type="location" placeholder="Location" onChange={this.handleLocation} />
                                    </Form.Group>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control value={this.state.firstname} type="firstname" placeholder="First Name" onChange={this.handleFirstname} />
                                    </Form.Group>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control value={this.state.lastname} type="lastname" placeholder="Last Name" onChange={this.handleLastname} />
                                    </Form.Group>
                                    <Form.Group controlId="formLatitude">
                                        <Form.Label>Latitude</Form.Label>
                                        <Form.Control value={this.state.latitude} type="latitude" placeholder="Latitude" onChange={this.handleLatitude} />
                                    </Form.Group>
                                    <Form.Group controlId="formLongitude">
                                        <Form.Label>Longitude</Form.Label>
                                        <Form.Control value={this.state.longitude} type="longitude" placeholder="Longitude" onChange={this.handleLongitude} />
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


                {/* for making a broadcast to users */}

                <div class="container">
                    <Container fluid="lg">
                        <h1 class="sign-in"> Submit Broadcast</h1>
                        <div class="card-container">
                            <div class="card">
                                <Form onSubmit={this.handleBroadcastSubmit}>
                                    <Form.Group controlId="formTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control value={this.state.title} type="title" placeholder="Title" onChange={this.handleTitle} />
                                    </Form.Group>
                                    <Form.Group controlId="formDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control value={this.state.description} type="description" placeholder="Description" onChange={this.handleDescription} />
                                    </Form.Group>
                                    <Form.Group controlId="formAuthor">
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control value={this.state.author} type="author" placeholder="Author" onChange={this.handleAuthor} />
                                    </Form.Group>
                                    <div class="button">
                                        <Button variant="primary" type="submit">
                                            Submit Broadcast
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Container>
                </div>

                {/* for analytics*/}
                <div class="container">
                    <Container fluid="lg">
                        <h1 class="sign-in"> Admin Analytics</h1>
                        <div class="card-container">
                            <div class="card">
                                <h3> Requests Made: {this.state.requestMade}</h3>
                                <h3> Requests Accepted: {this.state.requestAccepted}</h3>
                                <h3> Requests Rejected: {this.state.requestRejected}</h3>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home;