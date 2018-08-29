/**
 * MyEventsContainer page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import { Container, Row, Col } from 'reactstrap';

// Ramda
import { map } from 'ramda';

// Router
import Redirect from "react-router-dom/es/Redirect";

// Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators/index';

// Styles
import './my-events.scss';

// Components
import Aside from '../aside';
import EventItem from '../../components/event-item';

// Filters
import * as filters from '../../helpers/filters';


class MyEventsContainer extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount () {
        this.props.getEvents(filters.OWNED);
    }

    eventCreator = event => <EventItem key={event.title} event={event} />;

    render() {

        const { loggedOut, events, isLoading, error } = this.props;

        if (localStorage.getItem('user') === null)
            return (<Redirect to='/'/>);

        if(isLoading) {
            return (<p>Loading...</p>)
        } else if (error) {
            return (<p>Error!!!</p>)
        } else {
            return (
                <main className='dashboard'>
                    <Container fluid={true} className='pl-0'>
                        <Container className='pl-4 ml-0'>
                            <Row>
                                <Col xs='12' sm='12' md='3' lg='3'>
                                    <Aside />
                                </Col>
                                <Col xs='12' sm='12' md='9' lg='9' className='pl-4'>
                                    <div className='dashboard__events pt-4 pl-3'>
                                        <ul className='list-unstyled'>
                                            {map(this.eventCreator, events)}
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </main>
            );
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getEvents: (filter) => dispatch(actions.getEvents(filter))
    };
};

const mapStateToProps = state => {
    return { loggedOut: state.user.loggedOut, redirectLogin: state.user.redirectLogin, events: state.events.events,
    error: state.events.error, isLoading: state.events.eventsLoading};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyEventsContainer);