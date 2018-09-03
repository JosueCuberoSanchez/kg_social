/**
 * ResetPasswordContainer page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import {Container, Row, Col} from 'reactstrap';

// Logo
import logo from '../../assets/img/logo.png';

// Router
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators/index';

// Styles
import './reset-password.scss';

// Components
import ResetPasswordForm from '../../components/forms/reset-password-form/';

class ResetPasswordContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {validPassword: true, passwordsMatch: true, redirectToForgotPassword: false, redirectToLogin: false};
    }

    componentDidMount() {
        const { code } = this.props;
        this.props.verifyForgotPassword(code);
    }

    submit = (values) => {

        const { code } = this.props;

        if(values.password !== values.repassword){
            this.setState({passwordsMatch:false, validPassword: true});
        } else if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password))) {
            this.setState({validPassword: false, passwordsMatch: true});
        } else {
            this.props.resetPassword(code, values.password);
        }
    };

    redirectToForgotPassword = () => {
        this.setState({redirectToForgotPassword: true});
    };

    redirectToLogin = () => {
        this.setState({redirectToLogin: true});
    };

    render() {

        const { redirectDash, verifyLoading, verified, passwordReset } = this.props;

        if(redirectDash || (localStorage.getItem('user') !== null))
            return (<Redirect to='/dashboard' />);

        if(verifyLoading)
            return (<p>Loading...</p>);

        if(this.state.redirectToForgotPassword)
            return (<Redirect to='/forgotPassword' />);

        if(this.state.redirectToLogin)
            return (<Redirect to='/' />);

        return (
            <main className='reset-password'>
                <h1 className='sr-only'>Reset password page</h1>
                <Container fluid={true}>
                    <Row>
                        <Col xs='12' sm='4' md='4' lg='4' className='p-0 reset-password__aside-col'>
                            <div className='reset-password__aside h-100'/>
                        </Col>
                        <Col xs='12' sm={{size: 6, order: 2, offset: 1}}
                             md={{size: 6, order: 2, offset: 1}} lg={{size: 6, order: 2, offset: 1}}>
                            <div className='my-auto mt-5 pt-5'>
                                <img src={logo} alt='Logo' className='w-75 d-block mx-auto mb-5'/>
                                {
                                    passwordReset
                                    ? <div className='reset-password__ver p-5'>
                                            <p>Password reseted, please login into KG Social.</p>
                                            <button onClick={this.redirectToLogin}>Login</button>
                                        </div>
                                    : verified
                                        ? <ResetPasswordForm onSubmit={this.submit} validPassword={this.state.validPassword} passwordsMatch={this.state.passwordsMatch}/>
                                        : <div className='reset-password__ver p-5'>
                                                <p>Invalid code, please submit a forgot password request.</p>
                                                <button onClick={this.redirectToForgotPassword}>Forgot Password</button>
                                            </div>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        );

    }
}

const mapStateToProps = state => { return { verifyLoading: state.user.verifyLoading, verified: state.user.verified, passwordReset: state.user.passwordReset }; };

const mapDispatchToProps = dispatch => { return {
    verifyForgotPassword: (code) => dispatch(actions.verifyForgotPassword(code)),
    resetPassword: (code, password) => dispatch(actions.resetPassword(code, password))
}; };

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);