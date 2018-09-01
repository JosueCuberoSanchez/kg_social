/**
 * App component.
 * @author Josué David Cubero Sánchez.
 */

import 'babel-polyfill'; // necessary for async & await

import React from 'react'; //ES6 modules

// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//Styles
import './assets/scss/main.scss';

// Helpers
import { includeNavs } from './helpers/functions';

// Pages
import Login from './pages/login/';
import SignUp from './pages/signup/';
import Dashboard from './pages/dashboard';
import CreateEvent from './pages/createEvent';
import MyEvents from './pages/my-events';
import EnrolledEvents from './pages/enrolled-events';
import TopEvents from './pages/top-events';
import Event from './pages/event';
import Profile from './pages/profile';
import VerifyAccount from './pages/verifyAccount';

// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faSignOutAlt, faUserCog, faCalendar, faCalendarAlt, faCalendarMinus,
    faCalendarCheck, faCalendarPlus, faEdit, faPencilAlt, faStar } from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faSignOutAlt, faUserCog, faCalendar, faCalendarAlt,
    faCalendarMinus, faCalendarCheck, faCalendarPlus, faEdit, faPencilAlt, faStar);

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/dashboard' component={includeNavs(Dashboard)} />
                        <Route exact path='/myEvents' component={includeNavs(MyEvents)} />
                        <Route exact path='/enrolledEvents' component={includeNavs(EnrolledEvents)} />
                        <Route exact path='/topEvents' component={includeNavs(TopEvents)} />
                        <Route exact path='/createEvent' component={includeNavs(CreateEvent)} />
                        <Route exact path='/event/:id' component={includeNavs(withRouter(Event))}/>
                        <Route exact path='/profile' component={includeNavs(Profile)} />
                        <Route exact path='/verify/:code' component={VerifyAccount} />
                    </Switch>
            </BrowserRouter>
        </Provider>
    )
};

export default App;