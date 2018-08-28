import React from 'react';

// Styles
import './event-item.scss';

// Reactstrap
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

// Router
import { Link } from 'react-router-dom';

// Helpers
import { starCreator } from "../../helpers/functions";

const EventItem = ({event}) => {

    return (
        <li className='mb-4 event'>
            <article>
                <Card className='event__card'>
                    <Row>
                        <Col xs='12' sm='12' md='3' lg='3' className='d-flex'>
                            <Link to={`/event/${event._id}`}>
                                <CardImg className='justify-content-center align-self-center p-4 h-100' src={event.image} alt='Event image' />
                            </Link>
                        </Col>
                        <Col xs='12' sm='12' md='9' lg='9'>
                            <CardBody>
                                <CardTitle className='mb-3'>
                                    {event.title}
                                    <div className='d-inline-block float-right'>
                                        {starCreator(event)}
                                    </div>
                                </CardTitle>
                                <CardSubtitle className='mb-2'>{event.hashtags}</CardSubtitle>
                                <CardText>{event.description}</CardText>
                            </CardBody>
                        </Col>
                    </Row>
                </Card>
            </article>
        </li>
    )
};

export default EventItem;