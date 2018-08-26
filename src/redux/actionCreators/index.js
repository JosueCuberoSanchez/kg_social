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
            const user = JSON.parse(localStorage.getItem('user')).email;
            const result = await axios.get(`${Constants.BASE_URL}${Constants.EVENT}`, {params: {filter: filter,user: user}});
            const events = await result;
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

export const getEvent = (filter, id) => {
    return async dispatch => {
        dispatch({
            type: t.GET_EVENT_REQUEST
        });
        try {
            const user = JSON.parse(localStorage.getItem('user')).email;
            const result = await axios.get(`${Constants.BASE_URL}${Constants.EVENT}`, {params: {filter: filter,user: user, id: id}});
            const event = await result;
            dispatch({
                type: t.GET_EVENT_SUCCESS,
                payload: event.data.events
            });
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_EVENT_FAILURE,
                error: err
            })
        }
    }
};

export const updateEventImage = (image,id) => {
    return async dispatch => {
        dispatch({
            type: t.GET_EVENT_IMAGE_REQUEST
        });
        try {
            const result = await axios.post(`${Constants.BASE_URL}${Constants.EVENT_IMAGE}`,{image: image.location, id: id});
            const event = await result;
            console.log(event);
            dispatch({
                type: t.GET_EVENT_IMAGE_SUCCESS,
                payload: event.data.event
            });
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_EVENT_IMAGE_FAILURE,
                error: err
            })
        }
    }
};