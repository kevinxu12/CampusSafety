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
                            <h3 className="description">{this.props.data.description}</h3>
                            <h3> {this.props.name} </h3>
                            <button type="button" id="accept" className="btn btn-lg btn-block btn-primary" onClick={this.acceptRequest}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;