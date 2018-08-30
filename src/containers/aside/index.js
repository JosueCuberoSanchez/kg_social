/**
 * Aside component.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Styles
import './aside.scss';

// Ramda
import {map} from "ramda";

// Components
import LogItem from "../../components/log-item";
import * as actions from "../../redux/actionCreators";

// Redux
import { connect } from 'react-redux';

class Aside extends Component {

    constructor(props){ super(props); }

    componentDidMount() { this.props.getLogs(); }

    logCreator = log => <LogItem key={log.date} log={log} />;

    render() {

        const { areLoading, error, logs } = this.props;

        return (
            <aside className='aside pt-5'>
                {
                    areLoading
                        ? <p>Loading...</p>
                        : error
                        ? <p>Error!!!</p>
                        : <ul className='list-unstyled'>
                            {map(this.logCreator, logs)}
                        </ul>
                }
            </aside>
        );
    }
}

const mapStateToProps = state => {
    return { logs: state.logs.logs, areLoading: state.logs.areLoading, error: state.logs.error };
};

const mapDispatchToProps = dispatch => { return { getLogs: () => dispatch(actions.getLogs()) }; };

export default connect(mapStateToProps, mapDispatchToProps)(Aside);