import React from 'react';

// Reactstrap
import { Row, Col } from 'reactstrap';

// Helpers
import Rating from 'react-rating';
import {getEventRating} from '../../helpers/functions';

// Styles
import './event-header.scss';

const EventHeader = ({owner, userId, toggle, title, votes, stars }) => {

    const starFull = require('../../assets/img/star-full.png');
    const starEmpty = require('../../assets/img/star-empty.png');

    return (<div className='event-header'>
        {
            owner === userId
                ? <div className='d-flex justify-content-between'>
                    <div/>
                    <button onClick={toggle}>Edit event info</button>
                </div>
                : null
        }
        <Row className='mb-4 mt-2 pt-4'>
            <Col xs='12' sm='12' md='8' lg='8'>
                <h2 className='event-header__title'><strong>{title}</strong></h2>
            </Col>
            <Col xs='12' sm='12' md='4' lg='4'>
                <Rating initialRating={getEventRating(votes, stars)} readonly className='event-header__stars'
                        emptySymbol={<img src={starEmpty} className='icon' alt='Empty rating star'/>}
                        fullSymbol={<img src={starFull} className='icon'  alt='Full rating star'/>}/>
            </Col>
        </Row>
    </div>);
};

export default EventHeader;