import React from 'react';

// Ramda
import {  map } from 'ramda';

// Styles
import './event-attendees.scss';

// Router
import { Link } from 'react-router-dom';

const attendeeCreator = attendee =>
    <li key={attendee.user.username} className='attendee d-flex mb-3'>
        <Link to={`/profile/${attendee.user.username}`}>
            <img src={attendee.user.image} alt={`${attendee.user.username} profile picture`} className='attendee__image rounded-circle'/>
        </Link>
        <p className='my-auto ml-3'>{attendee.user.username}</p>
    </li>;

const EventAttendees = ({attendees}) => {

    return (
        <ul className='list-unstyled'>
            {map(attendeeCreator, attendees)}
        </ul>
    )
};

export default EventAttendees;