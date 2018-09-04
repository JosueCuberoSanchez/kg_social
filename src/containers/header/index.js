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
import * as actions from '../../redux/actionCreators/';
import Link from 'react-router-dom/es/Link';

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
                <Navbar expand='md' light>
                    <NavbarBrand href='/dashboard/all' className='header__brand'>
                        <img src={logo} className='w-100' alt='KG Social logo'/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem className='py-2 pl-3 mr-1'>
                                <Link to='/createEvent' className='header__link'>
                                    <FontAwesomeIcon icon='calendar' className='mr-2' alt='Create event link'/>Create
                                </Link>
                            </NavItem>
                            <NavItem className='py-2 pl-3 mr-1'>
                                <Link to='/dashboard/owned' className='header__link'>
                                    <FontAwesomeIcon icon='calendar-alt' className='mr-2' alt='My events link'/>My events
                                 </Link>
                            </NavItem>
                            <NavItem className='py-2 pl-3 mr-1'>
                                <Link to='/dashboard/enrolled' className='header__link'>
                                    <FontAwesomeIcon icon='calendar-check' className='mr-2' alt='Enrolled events link'/>Enrolled
                                </Link>
                            </NavItem>
                            <NavItem className='py-2 pl-3 mr-1'>
                                <Link to='/dashboard/top' className='header__link'>
                                    <FontAwesomeIcon icon='calendar-plus' className='mr-2' alt='Top rated events link'/>Top rated
                                </Link>
                            </NavItem>
                            <NavItem className='py-2 pl-3 mr-1'>
                                <Link to='/' className='header__link header__user-dropdown-item' onClick={this.logout}>
                                    <FontAwesomeIcon icon='sign-out-alt' className='mr-2' alt='Logout button'/>Logout
                                </Link>
                            </NavItem>
                            <NavItem className='py-2 pl-3 mr-1 header__user-dropdown-item'>
                                <Link to='/profile' className='header__link' aria-label="Profile link">
                                    <FontAwesomeIcon icon='user-cog' className='mr-2' alt='Profile link'/>Profile
                                </Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar className='mr-5 pr-3 header__user-dropdown' role='menu'>
                                <DropdownToggle nav caret className='pl-3' aria-label="User profile and logout dropdown" role='menuitem'>
                                    <FontAwesomeIcon icon='user' alt='User dropdown' />
                                </DropdownToggle>
                                <DropdownMenu right role='menu'>
                                    <DropdownItem onClick={this.logout} role='menuitem'>
                                        Logout <FontAwesomeIcon icon='sign-out-alt' className='ml-1' alt='Logout button'/>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <Link to={`/profile/${JSON.parse(localStorage.getItem('user')).username}`} className='header__link' role='menuitem'>
                                        <DropdownItem>
                                            My profile <FontAwesomeIcon icon='user-cog' className='ml-1' alt='My profile link'/>
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