/**
 * Reset password page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

import ResetPasswordContainer from "../../containers/reset-password/";

class ResetPassword extends Component{

    constructor(props) { super(props); }

    render() { return ( <ResetPasswordContainer code={this.props.match.params.code} /> ); }
}

export default ResetPassword;