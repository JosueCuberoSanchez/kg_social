/**
 * Event page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

import EventContainer from "../../containers/event/";

class Event extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <EventContainer id={this.props.match.params.id} isLoading={true}/>
        );
    }
}

export default Event;