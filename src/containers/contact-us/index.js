/**
 * ContactUsContainer page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import { Container, Row, Col } from 'reactstrap';

// Router
import Redirect from 'react-router-dom/es/Redirect';

// Redux
import * as actions from '../../redux/actionCreators/index';

// Components
import Aside from '../aside';
import ContactUsForm from '../../components/forms/contact-us-form/';

// Styles
import './contact-us.scss';

class ContactUsContainer extends Component {

    constructor(props) {super(props); this.state = {submitted: false}}

    async componentDidMount () { document.title = 'KGS | Contact Us'; }

    submit = (values) => {
      const user = JSON.parse(localStorage.getItem('user')).id;
      actions.contactUs({title: values.title, description: values.description, user: user});
      this.setState({submitted: true});
    };

    render() {

        if (localStorage.getItem('user') === null)
            return (<Redirect to='/'/>);

        return (
            <main className='contact-us'>
                <h1 className='sr-only'>Contact us page</h1>
                <Container fluid={true}>
                    <Container>
                        <Row className='mt-5 pt-5'>
                            <Col xs='12' sm='12' md='9' lg='9' className='mt-5'>
                                {
                                    this.state.submitted
                                        ? <p className='contact-us__ver p-5'>
                                            Thank you for getting in touch, soon you will be helped by an administrator.
                                        </p>
                                        : <div>
                                            <h2>Contact Us</h2>
                                            <ContactUsForm onSubmit={this.submit}/>
                                        </div>
                                }
                            </Col>
                            <Col xs='12' sm='12' md='3' lg='3'>
                                <Aside />
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </main>
        );
    }
}

export default ContactUsContainer;