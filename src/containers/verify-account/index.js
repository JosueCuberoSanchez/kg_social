/**
 * VerifyAccountContainer page.
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
import './verify-account.scss';

class VerifyAccountContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {redirectToLogin: false, redirectToSignUp: false};
    }

    componentDidMount() {
        document.title = 'KGS | Verify account';
        const { code } = this.props;
        this.props.verifyAccount(code);
    }

    redirectToLogin = () => {
      this.setState({redirectToLogin: true});
    };

    redirectToSignUp = () => {
        this.setState({redirectToSignUp: true});
    };

    render() {

        const { redirectDash, verifyLoading, verified } = this.props;

        if(redirectDash || (localStorage.getItem('user') !== null))
            return (<Redirect to='/dashboard' />);

        if(verifyLoading)
            return (<p>Loading...</p>);

        if(this.state.redirectToLogin)
            return (<Redirect to='/' />);

        if(this.state.redirectToSignUp)
            return (<Redirect to='/signup' />);

        return (
            <main className='verify-account'>
                <h1 className='sr-only'>Verify account page</h1>
                <Container fluid={true}>
                    <Row>
                        <Col xs='12' sm='4' md='4' lg='4' className='p-0 verify-account__aside-col'>
                            <div className='verify-account__aside h-100'/>
                        </Col>
                        <Col xs='12' sm={{size: 6, order: 2, offset: 1}}
                             md={{size: 6, order: 2, offset: 1}} lg={{size: 6, order: 2, offset: 1}}>
                            <div className='my-auto mt-5 pt-5'>
                                <img src={logo} alt='Logo' className='w-75 d-block mx-auto mb-5'/>
                                {
                                    verified
                                    ? <div className='verify-account__msg p-5'>
                                        <p>Your account has been verified, please click on the button to start logging in into KG Social.</p>
                                        <button onClick={this.redirectToLogin}>Next</button>
                                    </div>
                                    : <div className='verify-account__msg p-5'>
                                        <p>Invalid code, please sign up to KG Social.</p>
                                        <button onClick={this.redirectToSignUp}>SignUp</button>
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

const mapStateToProps = state => { return { verifyLoading: state.accountVerification.verifyLoading, verified: state.accountVerification.verified }; };

const mapDispatchToProps = dispatch => { return { verifyAccount: (code) => dispatch(actions.verifyAccount(code)) }; };

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccountContainer);