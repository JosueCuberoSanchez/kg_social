/**
 * Header component.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// Font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styles
import './header.scss';

// Logo
import logo from '../../assets/img/logo.png';

// Redux
import { connect } from 'react-redux';
import * as actions from "../../redux/actionCreators/";
import Link from "react-router-dom/es/Link";

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
        console.log(props);
    }

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    logout = () => {
        this.props.logout();
    };

    render() {
        return (
            <header className='header'>
                <Navbar expand="md" light>
                    <NavbarBrand href="/" className='header__brand'>
                        <img src={logo} className='w-100' alt='KG Social logo'/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <Link to='/createEvent' className='header__link'>
                                <NavItem className='py-2 pl-3 mr-1'>
                                    <FontAwesomeIcon icon="calendar" className='mr-2' alt='Create event link'/>Create
                                </NavItem>
                            </Link>
                            <Link to='/myEvents' className='header__link'>
                                <NavItem className='py-2 pl-3 mr-1'>
                                    <FontAwesomeIcon icon="calendar-alt" className='mr-2' alt='My events link'/>My events
                                </NavItem>
                            </Link>
                            <Link to='/enrolledEvents' className='header__link'>
                                <NavItem className='py-2 pl-3 mr-1'>
                                    <FontAwesomeIcon icon="calendar-check" className='mr-2' alt='Enrolled events link'/>Enrolled
                                </NavItem>
                            </Link>
                            <Link to='/topEvents' className='header__link'>
                                <NavItem className='py-2 pl-3 mr-1'>
                                    <FontAwesomeIcon icon="calendar-plus" className='mr-2' alt='Top rated events link'/>Top rated
                                </NavItem>
                            </Link>
                            <Link to='/' className='header__link header__user-dropdown-item' onClick={this.logout}>
                                <NavItem className='py-2 pl-3 mr-1'>
                                    <FontAwesomeIcon icon="sign-out-alt" className='mr-2' alt='Logout button'/>Logout
                                </NavItem>
                            </Link>
                            <Link to='/profile' className='header__link'>
                                <NavItem className='py-2 pl-3 mr-1 header__user-dropdown-item'>
                                    <FontAwesomeIcon icon="user-cog" className='mr-2' alt='Profile link'/>
                                    <p className='header__link-text'>Profile</p>
                                </NavItem>
                            </Link>
                            <UncontrolledDropdown nav inNavbar className='mr-5 pr-3 header__user-dropdown'>
                                <DropdownToggle nav caret className='pl-3'>
                                    <FontAwesomeIcon icon="user" alt='User dropdown'/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.logout}>
                                        Logout <FontAwesomeIcon icon="sign-out-alt" className='ml-1' alt='Logout button'/>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <Link to={`/profile/${JSON.parse(localStorage.getItem('user')).username}`} className='header__link'>
                                        <DropdownItem>
                                            My profile <FontAwesomeIcon icon="user-cog" className='ml-1' alt='My profile link'/>
                                        </DropdownItem>
                                    </Link>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Header);