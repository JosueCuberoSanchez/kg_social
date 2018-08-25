import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators';

// Components
import CreateForm from '../../components/create-form/';
import Aside from '../../components/aside';

// Styles
import './create-event.scss';

// Reactstrap
import { Container, Row, Col } from 'reactstrap';

class CreateEventContainer extends Component {

    constructor(props) {
        super(props);
    }

    submit = (values) => {
        this.props.createEvent(values);
    };

    render() {
        return (
            <main className='create-event'>
                <Container fluid={true} className='pl-0'>
                    <Container className='pl-4 ml-0'>
                        <Row>
                            <Col xs='12' sm='12' md='3' lg='3'>
                                <Aside />
                            </Col>
                            <Col xs='12' sm='12' md='9' lg='9' className='pl-4'>
                                <CreateForm onSubmit={this.submit} />
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </main>
        );
    }
}

// Todo redirect cuando hace el post

const mapDispatchToProps = dispatch => {
    return {
        createEvent: (values) => dispatch(actions.createEvent(values))
    };
};

export default connect(null, mapDispatchToProps)(CreateEventContainer);