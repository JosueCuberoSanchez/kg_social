/**
 * Sign up page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import {Container, Row, Col} from 'reactstrap';

// Logo
import logo from '../../assets/img/logo.png';

// Components
import SignUpForm from '../../components/forms/signUp-form/';

//  Styles
import './signup.scss';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {passwordsMatch: true, validPassword: true};
    }

    componentDidMount() {
        document.title = 'KGS | Sign up';
    }

    submit = (values) => {
        if(values.password !== values.repassword){
            this.setState({passwordsMatch:false, validPassword: true});
        } else if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password))) {
            this.setState({validPassword: false, passwordsMatch: true});
        } else {
            this.props.signup({
                username: values.username, firstName: values.firstName, lastName: values.lastName,
                email: values.email, password: values.password
            });
        }
    };

    render() {

        const { badCredentials, registered } = this.props;

        return (
            <main className='sign-up'>
                <Container fluid={true}>
                    <Row>
                        <Col xs='12' sm='4' md='4' lg='4' className='p-0 sign-up__aside-col'>
                            <div className='sign-up__aside h-100'/>
                        </Col>
                        <Col xs='12' sm={{size: 6, order: 2, offset: 1}}
                             md={{size: 6, order: 2, offset: 1}} lg={{size: 6, order: 2, offset: 1}}>
                            <div className='my-auto mt-5 pt-5'>
                                <img src={logo} alt='Logo' className='w-75 d-block mx-auto mb-5'/>
                                {
                                    registered
                                    ? <div>
                                            <h1 className='sr-only'>Sign up confirmation</h1>
                                            <p className='sign-up__ver p-5'>
                                                We've sent a verification email, please click on the link to validate your account.
                                            </p>
                                        </div>
                                    : <div>
                                        <h1>Sign up here</h1>
                                        <SignUpForm onSubmit={this.submit} badCredentials={badCredentials}
                                                        passwordsMatch={this.state.passwordsMatch} validPassword={this.state.validPassword}/>
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

const mapStateToProps = state => { return { badCredentials: state.user.badCredentials, registered: state.user.registered }; };

const mapDispatchToProps = dispatch => { return { signup: (values) => dispatch(actions.signup(values)) }; };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);