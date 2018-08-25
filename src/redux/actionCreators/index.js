import React from 'react';

// Axios
import axios from 'axios';

// Action types
import * as t from '../actions/types';

// Helpers
import * as Constants from '../../helpers/constants';

export const login = (credentials) => {
    return async dispatch => {
        dispatch({
            type: t.GET_LOGIN_REQUEST
        });
        try {
            const result = await axios.post(`${Constants.BASE_URL}${Constants.LOGIN}`, credentials);
            const user = await result;
            localStorage.setItem('user', JSON.stringify(user.data));
            // Update payload in reducer on success
            dispatch({
                type: t.GET_LOGIN_SUCCESS,
                payload: user.data
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_LOGIN_FAILURE,
                error: err
            })
        }
    }
};

export const logout = () => {
    return async dispatch => {
        dispatch({
            type: t.GET_LOGOUT_REQUEST
        });
        try {
            localStorage.removeItem('user');
            await axios.get(`${Constants.BASE_URL}${Constants.LOGOUT}`);
            // Update payload in reducer on success
            dispatch({
                type: t.GET_LOGOUT_SUCCESS,
                payload: null
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_LOGOUT_FAILURE,
                error: err
            })
        }
    }
};

export const getEvents = (filter) => {
    return async dispatch => {
        dispatch({
            type: t.GET_EVENTS_REQUEST
        });
        try {
            let result;
            if(filter !== null) {
                result = await axios.get(`${Constants.BASE_URL}${Constants.EVENT}`, filter);
            } else {
                result = await axios.get(`${Constants.BASE_URL}${Constants.EVENT}`);
            }
            const events = await result;
            console.log(events);
            // Update payload in reducer on success
            dispatch({
                type: t.GET_EVENTS_SUCCESS,
                payload: events.data.events
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_EVENTS_FAILURE,
                error: err
            })
        }
    }
};

export const createEvent = (values) => {
    return async dispatch => {
        dispatch({
            type: t.GET_CREATE_REQUEST
        });
        try {
            let body = values;
            body['owner'] = JSON.parse(localStorage.getItem('user')).email;
            const result = await axios.post(`${Constants.BASE_URL}${Constants.EVENT}`, body);
            const newEvent = await result;
            console.log(newEvent); // Testing
            dispatch({
                type: t.GET_CREATE_SUCCESS,
                payload: newEvent.data.event
            });
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_CREATE_FAILURE,
                error: err
            })
        }
    }
};
