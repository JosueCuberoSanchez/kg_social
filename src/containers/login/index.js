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
import { Link, Redirect } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators/index';

// Styles
import './login.scss';

// Components
import LoginForm from '../../components/forms/login-form/';

class LoginContainer extends Component {

    constructor(props) { super(props); }

    submit = (values) => { this.props.login(values); };

    render() {

        const { badCredentials, redirectDash } = this.props;

        if(redirectDash || (localStorage.getItem('user') !== null))
            return (<Redirect to='/dashboard' />);

        return (
            <main className='login'>
                <h1 className='sr-only'>Login page</h1>
                <Container fluid={true}>
                    <Row>
                        <Col xs='12' sm='4' md='4' lg='4' className='p-0 login__aside-col'>
                            <div className='login__aside h-100'/>
                        </Col>
                        <Col xs='12' sm={{size: 6, order: 2, offset: 1}}
                             md={{size: 6, order: 2, offset: 1}} lg={{size: 6, order: 2, offset: 1}}>
                            <div className='my-auto mt-5 pt-5'>
                                <img src={logo} alt='Logo' className='w-75 d-block mx-auto'/>
                                <LoginForm onSubmit={this.submit} badCredentials={badCredentials}/>
                                <p className='mt-4'>Don't have an account yet? &nbsp;
                                    <Link to={'/signup'}>
                                        sign up here
                                    </Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        );

    }
}

const mapStateToProps = state => { return { badCredentials: state.user.badCredentials, redirectDash: state.user.redirectDash }; };

const mapDispatchToProps = dispatch => { return { login: (values) => dispatch(actions.login(values)) }; };

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);