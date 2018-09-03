/**
 * LoginContainer page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import {Container, Row, Col} from 'reactstrap';

// Logo
import logo from '../../assets/img/logo.png';

// Router
import { Redirect } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators/index';

// Styles
import './forgot-password.scss';

// Components
import ForgotPasswordForm from '../../components/forms/forgot-password-form/';

class ForgotPasswordContainer extends Component {

    constructor(props) { super(props); }

    submit = (values) => { this.props.forgotPassword(values.email); };

    render() {

        const { redirectDash, resetSent } = this.props;

        if(redirectDash || (localStorage.getItem('user') !== null))
            return (<Redirect to='/dashboard' />);

        return (
            <main className='forgot-password'>
                <h1 className='sr-only'>Login page</h1>
                <Container fluid={true}>
                    <Row>
                        <Col xs='12' sm='4' md='4' lg='4' className='p-0 forgot-password__aside-col'>
                            <div className='forgot-password__aside h-100'/>
                        </Col>
                        <Col xs='12' sm={{size: 6, order: 2, offset: 1}}
                             md={{size: 6, order: 2, offset: 1}} lg={{size: 6, order: 2, offset: 1}}>
                            <div className='my-auto mt-5 pt-5'>
                                <img src={logo} alt='Logo' className='w-75 d-block mx-auto mb-5'/>
                                {
                                    resetSent
                                    ? <p className='forgot-password__ver p-5'>We've sent a verification email, please click on the link to reset your password.</p>
                                    : <ForgotPasswordForm onSubmit={this.submit} />
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        );

    }
}

const mapStateToProps = state => { return { resetSent: state.user.resetSent }; };

const mapDispatchToProps = dispatch => { return { forgotPassword: (email) => dispatch(actions.forgotPassword(email)) }; };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);