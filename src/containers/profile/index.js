/**
 * LoginContainer page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import {Container, Row, Col} from 'reactstrap';

//Redux
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators/index';

// Styles
import './profile.scss';

// Router
import Redirect from "react-router-dom/es/Redirect";

// Components
import Aside from "../aside";

class ProfileContainer extends Component {

    constructor(props) {
        super(props);
    }

    submit = (values) => {
        //this.props.login(values);
    };

    render() {

        const { loggedOut } = this.props;

        if (localStorage.getItem('user') === null)
            return (<Redirect to='/'/>);

        return (
            <main className='dashboard'>
                <Container fluid={true} className='pl-0'>
                    <Container className='pl-4 ml-0'>
                        <Row>
                            <Col xs='12' sm='12' md='3' lg='3'>
                                <Aside />
                            </Col>
                            <Col xs='12' sm='12' md='9' lg='9' className='pl-4'>
                                <div className='pt-4 pl-3'>
                                    HOLA
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </main>
        );

    }
}

const mapStateToProps = state => {
    return { loggedOut: state.user.loggedOut, redirectLogin: state.user.redirectLogin };
};

const mapDispatchToProps = dispatch => {
    return {
        //login: (values) => dispatch(actions.login(values))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);