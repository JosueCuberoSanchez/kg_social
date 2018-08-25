import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actionCreators';

// Styles
import './event.scss';
import Redirect from "react-router-dom/es/Redirect";

class CreateEventContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { loggedOut } = this.props;

        if (loggedOut && (localStorage.getItem('user') === null))
            return (<Redirect to='/'/>);

        return (
            <p>Some event</p>
        );
    }
}

const mapStateToProps = state => {
    return { loggedOut: state.user.loggedOut, redirectLogin: state.user.redirectLogin };
};

const mapDispatchToProps = dispatch => {
    return {
        createEvent: (values) => dispatch(actions.createEvent(values))
    };
};

export default connect(mapStateToProps)(CreateEventContainer);