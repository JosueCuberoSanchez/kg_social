import React from 'react';

// Ramda
import {  map } from 'ramda';

// Styles
import './event-attendees.scss';

const attendeeCreator = attendee =>
    <li key={attendee.username} className='attendee d-flex mb-3'>
        <img src={attendee.image} alt={`${attendee.username} profile picture`} className='attendee__image'/>
        <p className='my-auto ml-3'>{attendee.username}</p>
    </li>;

const EventAttendees = ({attendees}) => {

    return (
        <ul className='list-unstyled'>
            {map(attendeeCreator, attendees)}
        </ul>
    )
};

export default EventAttendees;