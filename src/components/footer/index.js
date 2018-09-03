/**
 * Header component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

// Styles
import './footer.scss';

// Reactstrap
import { Container, Row, Col } from 'reactstrap';

// Logo
import logo from '../../assets/img/logo.png';

// Router
import { Link } from 'react-router-dom';


const Footer = () => {

    return (
        <footer className='footer mt-5'>
            <nav className='d-flex justify-content-between'>
                <Container fluid={true}>
                    <Container >
                        <Row className='p-4'>
                            <Col xs='12' sm='12' md='3' lg='3'>
                                <img src={logo} alt='KG Social logo' className='footer__logo d-block mx-auto'/>
                            </Col>
                            <Col xs='12' sm='12' md='9' lg='9'>
                                <div className='text-center pt-4'>
                                    <div>
                                        <p className='d-inline-block footer__slogan-big'><strong>Never</strong> miss&nbsp;</p>
                                        <p className='d-inline-block footer__slogan-medium'>socials&nbsp;</p>
                                        <p className='d-inline-block footer__slogan-small'>again</p>
                                    </div>
                                    <Link to='/contact'>Need help? Contact us!</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </nav>
        </footer>
    );

};

export default Footer;