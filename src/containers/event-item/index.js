import React, { Component } from 'react';

// Styles
import './event-item.scss';

// Reactstrap
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

// Router
import { Link } from 'react-router-dom';

// Helpers
import { starCreator } from "../../helpers/functions";
import * as actions from "../../redux/actionCreators";

class EventItemContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {attendeesLoading: true, attendees: ''}
    }

    async componentDidMount() {
        const { event } = this.props;
        const numberOfAttendees = await actions.getNumberOfAttendees(event._id);
        let attendees;
        if(numberOfAttendees === 1){
            attendees = 'One person is going.';
        } else {
            attendees = `${numberOfAttendees} people going.`
        }
        this.setState({attendeesLoading: false, attendees: attendees});
    }

    render() {

        const { event } = this.props;

        if(this.state.attendeesLoading)
            return <p>Loading</p>;

        return (
            <li className='mb-4 event'>
                <article>
                    <Card className='event__card'>
                        <Row>
                            <Col xs='12' sm='12' md='4' lg='4' className='d-flex'>
                                <Link to={`/event/${event._id}`}>
                                    <CardImg className='justify-content-center align-self-center p-4 h-100'
                                             src={event.image} alt='Event image'/>
                                </Link>
                            </Col>
                            <Col xs='12' sm='12' md='8' lg='8'>
                                <CardBody>
                                    <CardTitle className='mb-3'>
                                        <Row>
                                            <Col xs='12' sm='7' md='12' lg='7'>
                                                <p className='mb-0'>{event.title}</p>
                                            </Col>
                                            <Col xs='12' sm='5' md='12' lg='5'>
                                                {starCreator(event)}
                                            </Col>
                                        </Row>
                                    </CardTitle>
                                    <CardText>{event.description}</CardText>
                                    <CardText>{this.state.attendees}</CardText>
                                    <CardSubtitle className='mb-2'>{event.hashtags}</CardSubtitle>
                                </CardBody>
                            </Col>
                        </Row>
                    </Card>
                </article>
            </li>
        )
    }

}

export default EventItemContainer;