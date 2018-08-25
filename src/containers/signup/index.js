/**
 * Sign up page.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';
import {Container, Row, Col} from 'reactstrap';

// Logo
import logo from '../../assets/img/logo.png';

// Router
import Link from 'react-router-dom/es/Link';

//Redux form
import { Field, reduxForm } from 'redux-form';

//Styles
import './signup.scss';

let SignUp = ()  => {

    const handleSubmit = (e, values) => {
        e.preventDefault();
        console.log(values);
    };

    return (
        <main>
            <Container fluid={true}>
                <Container>
                    <Row>
                        <Col xs='12' sm={{ size: 10, order: 2, offset: 1 }}
                             md={{ size: 8, order: 2, offset: 2 }} lg={{ size: 6, order: 2, offset: 3 }}>>
                            <div>
                                <img src={logo} alt='Logo' />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor='email'>Enter email</label>
                                        <Field name='email' component='input' type='email' required={true} />
                                    </div>
                                    <div>
                                        <label htmlFor='firstName'>Enter first name</label>
                                        <Field name='firstName' component='input' type='text' required={true}/>
                                    </div>
                                    <div>
                                        <label htmlFor='firstName'>Enter last name</label>
                                        <Field name='firstName' component='input' type='text' required={true}/>
                                    </div>
                                    <div>
                                        <label htmlFor='firstName'>Enter username</label>
                                        <Field name='firstName' component='input' type='text' required={true}/>
                                    </div>
                                    <div>
                                        <label htmlFor='firstName'>Enter points</label>
                                        <Field name='firstName' component='input' type='text' required={true}/>
                                    </div>
                                    <div>
                                        <label htmlFor='password'>Enter password</label>
                                        <Field name='password' component='input' type='password' required={true}/>
                                    </div>
                                    <div>
                                        <label htmlFor='confirmPassword'>Re-enter password</label>
                                        <Field name='confirmPassword' component='input' type='password' required={true}/>
                                    </div>
                                    <button type='submit'>Submit</button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </main>
    );
};

SignUp = reduxForm({
    // a unique name for the form
    form: 'signup'
})(SignUp);

export default SignUp;