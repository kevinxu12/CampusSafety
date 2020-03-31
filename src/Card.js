import React, { Component } from 'react'
import './Card.css'
class Card extends Component {

    acceptRequest() {
        console.log("accepting request");
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="card box-shadow" id="container">
                        <div className="card-body">
                            <h4 id="title" className="my-0 font-weight-normal">{this.props.data.title}</h4>
                            <button type="button" id="location-tag" className="btn btn-lg btn-block btn-primary">{this.props.data.location}</button>
                            <div className="row" id = "main-content">
                                <h3> Author: {this.props.data.firstname} {this.props.data.lastname}</h3>
                                <h5 className = "description"> Description: {this.props.data.description}</h5>
                            </div>
                            <button type="button" id="accept" className="btn btn-lg btn-block btn-primary" onClick={this.acceptRequest}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;