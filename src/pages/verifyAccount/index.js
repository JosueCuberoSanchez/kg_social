/**
 * Verify Account page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

import VerifyAccountContainer from "../../containers/verifyAccount/";

class VerifyAccount extends Component{

    constructor(props) { super(props); }

    render() { return ( <VerifyAccountContainer code={this.props.match.params.code} /> ); }
}

export default VerifyAccount;