import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators';

// Components
import EventForm from '../../components/forms/event-form/';
import Aside from '../../components/aside';

// Styles
import './create-event.scss';

// Reactstrap
import { Container, Row, Col } from 'reactstrap';
import Redirect from "react-router-dom/es/Redirect";

class CreateEventContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {redirect: false};
    }

    submit = (values) => {
        this.props.updateEvent(values, true, null);
    };

    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    componentWillUpdate(nextProps) {
        if(!this.state.redirect) {
            const {newEvent} = this.props;
            if (this.isEmpty(newEvent)) {
                this.setState({redirect: true});
                return true;
            }
            if(nextProps.title !== newEvent.title) {
                this.setState({redirect: true});
                return true;
            }
            return false
        } else {
            return true;
        }
    }

    render() {

        const { loggedOut, newEvent } = this.props;

        if (loggedOut && (localStorage.getItem('user') === null))
            return (<Redirect to='/'/>);

        if(this.state.redirect)
            return (<Redirect to={`/event/${newEvent._id}`} />);

        return (
            <main className='create-event'>
                <Container fluid={true} className='pl-0'>
                    <Container className='pl-4 ml-0'>
                        <Row>
                            <Col xs='12' sm='12' md='3' lg='3'>
                                <Aside />
                            </Col>
                            <Col xs='12' sm='12' md='9' lg='9' className='pl-4 pt-5'>
                                <EventForm onSubmit={this.submit} update={false} toggleDataModal={null} event={null} />
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return { loggedOut: state.user.loggedOut, redirectLogin: state.user.redirectLogin, newEvent: state.events.currentEvent };
};

const mapDispatchToProps = dispatch => {
    return {
        updateEvent: (values, create, id) => dispatch(actions.updateEvent(values, create, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventContainer);