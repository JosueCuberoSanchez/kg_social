import React from 'react';

// Reactstrap
import { Row, Col } from 'reactstrap';

// Helpers
import { getFirstAttendees } from '../../helpers/functions';

// Styles
import './event-footer.scss';

const EventFooter = ({owner, username, toggleImageModal, hashtags, attendees, toggleAttendeesModal, enroll, unenroll, checkEnroll}) => {

    return (
        <div className='event-footer'>
            <Row>
                <Col xs='12' sm='12' md='12' lg='12'>
                    <Row>
                        <Col xs='12' sm='4' md='4' lg='4' className='order-sm-2 order-1'>
                            <div className='float-right event-footer__edit-img-container mb-4'>
                                {
                                    owner === username
                                        ? <button onClick={toggleImageModal}>Edit event photo</button>
                                        : null
                                }
                            </div>
                        </Col>
                        <Col xs='12' sm='8' md='8' lg='8' className='order-sm-1 order-2'>
                            <p className='mb-4'>{hashtags}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs='12' sm='12' md='12' lg='12'>
                    <Row>
                        <Col xs='12' sm='8' md='8' lg='8' className='mb-3'>
                            <p>Attendees:</p>
                            {getFirstAttendees(attendees)}
                            <button onClick={toggleAttendeesModal} className='event-footer__attendees-btn pt-0 pb-3'>...</button>
                        </Col>
                        <Col xs='12' sm='4' md='4' lg='4' className='mb-3'>
                            <div className='float-right'>
                                {
                                    owner === username
                                        ? null
                                        : checkEnroll(attendees)
                                         ? <button onClick={unenroll}>Unenroll!</button>
                                         : <button onClick={enroll}>Enroll!</button>
                                }
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
};

export default EventFooter;