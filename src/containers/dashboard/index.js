/**
 * DashboardContainer page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Reactstrap
import { Container, Row, Col } from 'reactstrap';

// Ramda
import { map } from 'ramda';

// Router
import Redirect from 'react-router-dom/es/Redirect';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators/index';

// Styles
import './dashboard.scss';

// Components
import Aside from '../aside';
import EventItemContainer from '../event-item/';
import SearchBar from '../../components/search-bar/';

class DashboardContainer extends Component {

    constructor(props) {
        super(props);

        this.state = { searchTerm: ''};
    }

    async componentDidMount () {
        document.title = 'KGS | Dashboard';
        this.props.getEvents(this.props.filter);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.filter !== nextProps.filter) {
            this.props.getEvents(nextProps.filter);
        }
    }

    search = (searchTerm) => {
        this.setState({searchTerm: searchTerm});
    };

    eventCreator = event => <EventItemContainer key={event.title} event={event} filter={this.state.searchTerm}/>;

    render() {

        const { events, isLoading, error } = this.props;

        if (localStorage.getItem('user') === null)
            return (<Redirect to='/'/>);

        if(isLoading) {
            return (<p>Loading...</p>)
        } else if (error) {
            return (<p>Error!!!</p>)
        } else {
            return (
                <main className='dashboard'>
                    <h1 className='sr-only'>Dashboard page</h1>
                    <Container fluid={true}>
                        <Container>
                            <Row>
                                <Col xs='12' sm='12' md='9' lg='9'>
                                    <Row className='mt-5 pb-4'>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <h2>Upcoming Events</h2>
                                        </Col>
                                        <Col xs='12' sm='6' md='6' lg='6'>
                                            <SearchBar onSearchTermChange={this.search} />
                                        </Col>
                                    </Row>
                                    <div className='dashboard__events'>
                                        <ul className='list-unstyled'>
                                            {map(this.eventCreator, events)}
                                        </ul>
                                    </div>
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
}

const mapDispatchToProps = dispatch => { return { getEvents: (filter) => dispatch(actions.getEvents(filter)) }; };

const mapStateToProps = state => {
    return { events: state.events.events,
    error: state.events.error, isLoading: state.events.eventsLoading};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);