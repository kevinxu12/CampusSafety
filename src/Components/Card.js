import React, { Component } from 'react'
import '../Style/Card.css'
class Card extends Component {
    constructor(props) {
        super(props)
        this.acceptRequest = this.acceptRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
    }
    acceptRequest() {
        this.props.acceptRequest(this.props.data._id);
    }

    rejectRequest() {
        this.props.rejectRequest(this.props.data._id);
    }
    renderAcceptReject() {
        if (!this.props.isAccepted) {
            return <div> 
                <button type="button" id="accept" className="btn btn-lg btn-block btn-primary" onClick={this.acceptRequest}>Accept</button>
                <button type="button" id="location-tag" className="btn btn-lg btn-block btn-primary" onClick={this.rejectRequest}>Reject</button>
            </div>
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="card box-shadow" id="container">
                        <div className="card-body">
                            <h4 id="title" className="my-0 font-weight-normal">{this.props.data.title}</h4>
                            <div className="row" id="main-content">
                                <h3> Author: {this.props.data.firstname} {this.props.data.lastname}</h3>
                                <h5 className="description"> Description: {this.props.data.description}</h5>
                            </div>
                            {this.renderAcceptReject()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;