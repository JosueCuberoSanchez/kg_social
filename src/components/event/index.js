import React from 'react';

// Styles
import './event.scss';

import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const Event = ({event}) => {

    return (
        <li className='mb-4 event'>
            <Card className='event__card'>
                <Row>
                    <Col xs='12' sm='12' md='3' lg='3' className='d-flex pr-0'>
                        <CardImg className='justify-content-center align-self-center p-4 h-100' src={event.image} alt='Event image' />
                    </Col>
                    <Col xs='12' sm='12' md='9' lg='9' className='pl-0'>
                        <CardBody>
                            <CardTitle className='mb-3'>{event.title}</CardTitle>
                            <CardSubtitle className='mb-2'>{event.hashtags}</CardSubtitle>
                            <CardText>{event.description}</CardText>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        </li>
    )
};

export default Event;