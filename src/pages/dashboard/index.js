/**
 * Dashboard page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

import DashboardContainer from '../../containers/dashboard/';

class Dashboard extends Component {

    constructor(props) { super(props); }

    render() {
        return (
            <DashboardContainer filter={this.props.match.params.filter} isLoading={true}/>
        );
    }
}

export default Dashboard;