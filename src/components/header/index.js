/**
 * Header component.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap';

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
import SideNav from "react-sidenav";

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
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
                <Navbar color="light" light expand="sm">
                    <NavbarBrand href="/" className='w-25'>
                        <img src={logo} className='w-50'/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className='header__item mr-5'>
                                <Link to={'/about'} className='header__link'>
                                    About
                                </Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar className='mr-5 pr-3'>
                                <DropdownToggle nav caret>
                                    <FontAwesomeIcon icon="user" />
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.logout}>
                                        Logout <FontAwesomeIcon icon="sign-out-alt" className='ml-1'/>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <Link to={'/profile'} className='header__link'>
                                        <DropdownItem>
                                            My profile <FontAwesomeIcon icon="user-cog" className='ml-1'/>
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