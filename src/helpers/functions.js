import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

export const starCreator = (event) => {
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

export const getAttendees = (event) => { // Helper
    if(event.attendees.length > 0) {
        return `${event.attendees.join(', ')} and ${event.owner} are going.`;
    } else {
        return `${event.owner} is going.`;
    }
};

export const getEventDate = (event) => { return new Date(event.date).getDate()+1; };

export const getEventDay = (event) => {
    switch (new Date(event.date).getDay()+1) {
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        case 7: return 'Sunday';
    }
};

export const getEventMonth = (event) => {
    switch (new Date(event.date).getMonth()+1) {
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

