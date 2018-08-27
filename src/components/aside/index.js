/**
 * Aside component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Reactstrap
import { Nav, NavItem, NavLink } from 'reactstrap';

// Router
import Link from "react-router-dom/es/Link";

// Styles
import './aside.scss';

// Font awesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Aside = ()  => {
    return (
        <aside className='aside'>
            <Nav vertical>
                <Link to='/createEvent' className='aside__link'>
                    <NavItem className='border-bottom py-2 pl-3'>
                        <FontAwesomeIcon icon="calendar" className='mr-2'/> Create event
                    </NavItem>
                </Link>
                <Link to='/myEvents' className='aside__link'>
                    <NavItem className='border-bottom py-2 pl-3'>
                        <FontAwesomeIcon icon="calendar-alt" className='mr-2'/> See my events
                    </NavItem>
                </Link>
                <Link to='/enrolledEvents' className='aside__link'>
                    <NavItem className='border-bottom py-2 pl-3'>
                        <FontAwesomeIcon icon="calendar-check" className='mr-2'/> See enrolled events
                    </NavItem>
                </Link>
                <Link to='/topEvents' className='aside__link'>
                    <NavItem className='border-bottom py-2 pl-3'>
                        <FontAwesomeIcon icon="calendar-plus" className='mr-2'/> See top rated events
                    </NavItem>
                </Link>
                <Link to='/dashboard' className='aside__link'>
                    <NavItem className='py-2 pl-3'>
                        <FontAwesomeIcon icon="calendar-minus" className='mr-2'/> See all events
                    </NavItem>
                </Link>
            </Nav>
        </aside>
    );
};

export default Aside;