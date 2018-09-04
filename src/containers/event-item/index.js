import React, { Component } from 'react';

// Styles
import './event-item.scss';

// Reactstrap
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

// Router
import { Link } from 'react-router-dom';

// Helpers
import * as actions from '../../redux/actionCreators';
import {getEventRating} from '../../helpers/functions';

// Rating
import Rating from 'react-rating';


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

        const {event, filter} = this.props;
        const starFull = require('../../assets/img/star-full.png');
        const starEmpty = require('../../assets/img/star-empty.png');

        if (this.state.attendeesLoading)
            return <p>Loading</p>;

        if (event.hashtags.toLowerCase().includes(filter.toLowerCase()) || event.title.toLowerCase().includes(filter.toLowerCase())) {
            return (
                <li className='mb-4 event-item'>
                    <article>
                        <Card className='event-item__card'>
                            <Row>
                                <Col xs='12' sm='12' md='4' lg='4' className='d-flex'>
                                    <Link to={`/event/${event._id}`}>
                                        <CardImg className='justify-content-center align-self-center p-4 h-100' src={event.image} alt='Event image'/>
                                    </Link>
                                </Col>
                                <Col xs='12' sm='12' md='8' lg='8'>
                                    <CardBody>
                                        <div className='mb-3'>
                                            <Row>
                                                <Col xs='12' sm='8' md='12' lg='8'>
                                                    <h3 className='mb-0 event-item__title'><strong>{event.title}</strong></h3>
                                                </Col>
                                                <Col xs='12' sm='4' md='12' lg='4'>
                                                    <Rating initialRating={getEventRating(event.votes, event.stars)} readonly className='event-item__stars' emptySymbol={<img src={starEmpty} className='icon' alt='Empty rating star'/>} fullSymbol={<img src={starFull} className='icon' alt='Full rating star'/>}/>
                                                </Col>
                                            </Row>
                                        </div>
                                        <CardText>{event.description}</CardText>
                                        <CardText>{this.state.attendees}</CardText>
                                        <em className='mb-2'>{event.hashtags}</em>
                                    </CardBody>
                                </Col>
                            </Row>
                        </Card>
                    </article>
                </li>
            )
        } else {
            return null;
        }
    }
}

export default EventItemContainer;