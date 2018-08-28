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

// Helpers
import { isEmpty } from "../../helpers/functions";

// Router
import Redirect from "react-router-dom/es/Redirect";

class CreateEventContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {redirect: false};
    }

    submitData = (values) => { this.props.updateEvent(values, true, null); };

    componentWillUpdate(nextProps) { // check if on submit we should redirect the user to the newly creatd event page
        if(!this.state.redirect) {
            const {newEvent} = this.props;
            if ( (isEmpty(newEvent)) || (nextProps.title !== newEvent.title)) {
                this.setState({redirect: true});
                return true;
            }
            return false;
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
                <h1 className='sr-only'>Create event page</h1>
                <Container fluid={true}>
                    <Container>
                        <Row>
                            <Col xs='12' sm='12' md='9' lg='9' className='pt-5'>
                                <EventForm onSubmit={this.submitData} update={false} toggleDataModal={null} event={null} />
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

const mapStateToProps = state => {
    return { loggedOut: state.user.loggedOut, redirectLogin: state.user.redirectLogin, newEvent: state.events.currentEvent };
};

const mapDispatchToProps = dispatch => {
    return {
        updateEvent: (values, create, id) => dispatch(actions.updateEvent(values, create, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventContainer);