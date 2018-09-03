import React from 'react';

// Reactstrap
import { Row, Col } from 'reactstrap';

// Helpers
import {getEventDate, getEventDay, getEventMonth} from '../../helpers/functions';

// Styles
import './event-body.scss';

const EventBody = ({date, location, description, image}) => {

    return (
        <Row className='event-body'>
            <Col xs='12' sm='4' md='4' lg='4' className='mb-4'>
                <div className='event-body__date h-100 p-2'>
                    <p className='event-body__date--date mb-0'>{getEventDate(date)}</p>
                    <p className='event-body__date--day mb-0'>{getEventDay(date)}</p>
                    <p className='event-body__date--month'>{getEventMonth(date)}</p>
                    <p className='event-body__location mt-4'>{location}</p>
                    <p className='event-body__description mt-4'>{description}</p>
                </div>
            </Col>
            <Col xs='12' sm='8' md='8' lg='8' className='mb-4'>
                <img src={image} className='d-block mx-auto w-100 h-100' alt='Event main photo'/>
            </Col>
        </Row>
    )
};

export default EventBody;
