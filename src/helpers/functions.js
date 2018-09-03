import React from "react";

// Components
import Header from "../containers/header";
import Footer from "../components/footer";

// Font awesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Helpers
import { MS_PER_DAY } from "./constants";

// Router
import { Link } from 'react-router-dom';

export const includeNavs = (Component) => {
    return class includeHeaderComponent extends React.Component{ render(){ return ( <div><Header/><Component /><Footer /></div> ); } };
};

export const isEmpty = (obj) => {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

export const getFirstAttendees = (attendees) => {
    switch (attendees.length) {
        case 1:
            return <ul className='list-unstyled list-inline'>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[0].username}`}>
                        <img src={attendees[0].image} alt={`${attendees[0].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
            </ul>;
        case 2:
            return <ul className='list-unstyled list-inline'>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[0].username}`}>
                        <img src={attendees[0].image} alt={`${attendees[0].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[1].username}`}>
                        <img src={attendees[1].image} alt={`${attendees[1].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
            </ul>;
        case 3:
            return <ul className='list-unstyled list-inline'>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[0].username}`}>
                        <img src={attendees[0].image} alt={`${attendees[0].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[1].username}`}>
                        <img src={attendees[1].image} alt={`${attendees[1].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[2].username}`}>
                        <img src={attendees[2].image} alt={`${attendees[2].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
            </ul>;
        case 4:
            return <ul className='list-unstyled list-inline'>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[0].username}`}>
                        <img src={attendees[0].image} alt={`${attendees[0].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[1].username}`}>
                        <img src={attendees[1].image} alt={`${attendees[1].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[2].username}`}>
                        <img src={attendees[2].image} alt={`${attendees[2].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[3].username}`}>
                        <img src={attendees[3].image} alt={`${attendees[3].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
            </ul>;
        case 5:
        default:
            return <ul className='list-unstyled list-inline'>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[0].username}`}>
                        <img src={attendees[0].image} alt={`${attendees[0].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[1].username}`}>
                        <img src={attendees[1].image} alt={`${attendees[1].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[2].username}`}>
                        <img src={attendees[2].image} alt={`${attendees[2].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[3].username}`}>
                        <img src={attendees[3].image} alt={`${attendees[3].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
                <li className='list-inline-item event-footer__attendee'>
                    <Link to={`/profile/${attendees[4].username}`}>
                        <img src={attendees[4].image} alt={`${attendees[4].username} profile picture`} className='w-100'/>
                    </Link>
                </li>
            </ul>;
    }
};

export const getEventDate = (date) => { return new Date(date).getDate(); };

export const getEventDay = (date) => {
    switch (new Date(date).getDay()) {
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        case 7: return 'Sunday';
    }
};

export const getEventMonth = (date) => {
    switch (new Date(date).getMonth()+1) {
        case 1: return 'January';
        case 2: return 'February';
        case 3: return 'March';
        case 4: return 'April';
        case 5: return 'May';
        case 6: return 'June';
        case 7: return 'July';
        case 8: return 'August';
        case 9: return 'September';
        case 10: return 'October';
        case 11: return 'November';
        case 12: return 'December';
    }
};

export const getLogDate = (date) => {
    const eventDate = new Date(date);
    const now = new Date();
    const utc1 = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const dayDiff = Math.floor((utc2 - utc1) / MS_PER_DAY);
    if(dayDiff === 0)
        return getHourDifference(eventDate, now);
    if(dayDiff === 1)
        return `${dayDiff} day ago.`;
    return `${dayDiff} days ago.`;
};

const getHourDifference = (eventDate, now) => {
    const eventDateHour = eventDate.getHours();
    const nowHour = now.getHours();
    const hourDiff = nowHour - eventDateHour;
    if(hourDiff === 0)
        return getMinuteDifference(eventDate, now);
    if(hourDiff === 1)
        return `An hour ago.`;
    return `${hourDiff} hours ago.`
};

const getMinuteDifference = (eventDate, now) => {
    const eventDateMin = eventDate.getMinutes();
    const nowMin = now.getMinutes();
    const minDiff = nowMin - eventDateMin;
    if(minDiff === 0)
        return 'A few seconds ago.';
    if(minDiff === 1)
        return `An minute ago.`;
    return `${minDiff} minutes ago.`
};

export const getEventRating = (votes, stars) => {
    if(votes === 0)
        return 0;
    return Math.floor(stars / votes);
};