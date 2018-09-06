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
import Event from './pages/event';
import Profile from './pages/profile';
import VerifyAccount from './pages/verify-account';
import ForgotPassword from './pages/forgot-password';
import ResetPassword from './pages/reset-password';

// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faSignOutAlt, faUserCog, faCalendar, faCalendarAlt, faCalendarMinus, faCalendarCheck, faCalendarPlus, faEdit, faPencilAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(faUser, faSignOutAlt, faUserCog, faCalendar, faCalendarAlt, faCalendarMinus, faCalendarCheck, faCalendarPlus, faEdit, faPencilAlt, faStar, fab);

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter basename='/'>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/dashboard/:filter' component={includeNavs(withRouter(Dashboard))} />
                        <Route exact path='/createEvent' component={includeNavs(CreateEvent)} />
                        <Route exact path='/event/:id' component={includeNavs(withRouter(Event))}/>
                        <Route exact path='/profile/:user' component={includeNavs(withRouter(Profile))} />
                        <Route exact path='/verify/:code' component={VerifyAccount} />
                        <Route exact path='/forgotPassword' component={ForgotPassword} />
                        <Route exact path='/resetPassword/:code' component={ResetPassword} />
                    </Switch>
            </BrowserRouter>
        </Provider>
    )
};

export default App;