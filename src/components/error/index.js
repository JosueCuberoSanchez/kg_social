import React from 'react';

//Reactrstap
import { Container, Row, Col } from 'reactstrap';

//Router
import { Redirect } from 'react-router-dom';

// Images
import errorLogo from '../../assets/img/error.png';

// Styles
import './error.scss';

const redirect = () => {
    return <Redirect to='/'/>
};

const Error = () => {
    return(
        <Container fluid={true} className='error'>
            <Container>
                <Row className='d-flex h-100'>
                    <h1 className='sr-only'>Error page</h1>
                    <img src={errorLogo} alt='Error page image' className='w-50 h-50 error__img' />
                    <div className='justify-content-center align-self-center error__info'>
                        <h2>Ooooops!</h2>
                        <p>Something went wrong on the page, please try again later.</p>
                        <button onClick={redirect}>Take me to a safe place</button>
                    </div>
                </Row>
            </Container>
        </Container>
    )
};

export default Error;