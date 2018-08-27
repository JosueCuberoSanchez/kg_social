import React from 'react';

// Styles
import './event-item.scss';

// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';

const EventItem = ({event}) => {

    const starCreator = () => {
      switch (event.stars) {
          case 5:
              return <ul className='list-unstyled list-inline'><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li></ul>;
          case 4:
              return <ul className='list-unstyled list-inline'><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li></ul>;
          case 3:
              return <ul className='list-unstyled list-inline'><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li></ul>;
          case 2:
              return <ul className='list-unstyled list-inline'><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li></ul>;
          case 1:
              return <ul className='list-unstyled list-inline'><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' /></li></ul>;
          case 0:
              return <ul className='list-unstyled list-inline'><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li><li className='list-inline-item'><FontAwesomeIcon icon='star' className='event__icon-non-solid' /></li></ul>;
      }
    };

    return (
        <li className='mb-4 event'>
            <Card className='event__card'>
                <Row>
                    <Col xs='12' sm='12' md='3' lg='3' className='d-flex pr-0'>
                        <Link to={`/event/${event._id}`}>
                            <CardImg className='justify-content-center align-self-center p-4 h-100' src={event.image} alt='Event image' />
                        </Link>
                    </Col>
                    <Col xs='12' sm='12' md='9' lg='9' className='pl-0'>
                        <CardBody>
                            <CardTitle className='mb-3'>
                                {event.title}
                                <div className='d-inline-block float-right'>
                                    {starCreator()}
                                </div>
                            </CardTitle>
                            <CardSubtitle className='mb-2'>{event.hashtags}</CardSubtitle>
                            <CardText>{event.description}</CardText>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        </li>
    )
};

export default EventItem;