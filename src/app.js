/**
 * App component.
 * @author Josué David Cubero Sánchez.
 */

import 'babel-polyfill'; // necessary for async & await

import React from 'react'; //ES6 modules
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//Styles
import './assets/scss/main.scss';

// Components
import Header from './components/header';
import Footer from './components/footer';

// Pages
import Login from './pages/login/';
import SignUp from './pages/signup/';
import Dashboard from './pages/dashboard';
import CreateEvent from './pages/createEvent';
import MyEvents from './pages/my-events';
import EnrolledEvents from './pages/enrolled-events';
import TopEvents from './pages/top-events';
import Event from './pages/event';

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
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/signup' component={SignUp} />
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/myEvents' component={MyEvents} />
                        <Route exact path='/enrolledEvents' component={EnrolledEvents} />
                        <Route exact path='/topEvents' component={TopEvents} />
                        <Route exact path='/createEvent' component={CreateEvent} />
                        <Route exact path='/event/:id' component={Event} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        </Provider>
    )
};

export default App;