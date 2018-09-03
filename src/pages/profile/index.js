/**
 * Profile page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

import ProfileContainer from '../../containers/profile/';

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ProfileContainer username={this.props.match.params.username} userLoading={true}/>
        );
    }
}

export default Profile;