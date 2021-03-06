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

export const signup = (credentials) => {
    return async dispatch => {
        dispatch({
            type: t.GET_CREATE_USER_REQUEST
        });
        try {
            await axios.post(`${Constants.BASE_URL}${Constants.USER}`, credentials);
            dispatch({
                type: t.GET_CREATE_USER_SUCCESS,
                payload: null
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_CREATE_USER_FAILURE,
                error: err
            })
        }
    }
};

export const verifyAccount = (code) => {
    return async dispatch => {
        dispatch({
            type: t.GET_VERIFY_SIGNUP_CODE_REQUEST
        });
        try {
            await axios.get(`${Constants.BASE_URL}${Constants.VERIFY_SIGNUP_CODE}`, {params: {code: code}});
            dispatch({
                type: t.GET_VERIFY_SIGNUP_CODE_SUCCESS,
                payload: null
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_VERIFY_SIGNUP_CODE_FAILURE,
                error: err
            })
        }
    }
};

export const forgotPassword = (email) => {
    return async dispatch => {
        dispatch({
            type: t.GET_FORGOT_PASSWORD_REQUEST
        });
        try {
            await axios.post(`${Constants.BASE_URL}${Constants.FORGOT_PASSWORD}`, {email: email});
            dispatch({
                type: t.GET_FORGOT_PASSWORD_SUCCESS,
                payload: null
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_FORGOT_PASSWORD_FAILURE,
                error: err
            })
        }
    }
};

export const verifyForgotPassword = (code) => {
    return async dispatch => {
        dispatch({
            type: t.GET_VERIFY_FORGOT_PASSWORD_CODE_REQUEST
        });
        try {
            await axios.get(`${Constants.BASE_URL}${Constants.VERIFY_FORGOT_PASSWORD_CODE}`, {params: {code: code}});
            dispatch({
                type: t.GET_VERIFY_FORGOT_PASSWORD_CODE_SUCCESS,
                payload: null
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_VERIFY_FORGOT_PASSWORD_CODE_FAILURE,
                error: err
            })
        }
    }
};

export const resetPassword = (code, password) => {
    return async dispatch => {
        dispatch({
            type: t.GET_RESET_PASSWORD_REQUEST
        });
        try {
            await axios.post(`${Constants.BASE_URL}${Constants.RESET_PASSWORD}`, {code: code, password: password});
            dispatch({
                type: t.GET_RESET_PASSWORD_SUCCESS,
                payload: null
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_RESET_PASSWORD_FAILURE,
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
            const user = JSON.parse(localStorage.getItem('user')).id;
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
            type: t.GET_CREATE_EVENT_REQUEST
        });
        try {
            let body = values;
            body['owner'] = JSON.parse(localStorage.getItem('user')).id;
            if(body.private === undefined)
                body['private'] = false;
            const result = await axios.post(`${Constants.BASE_URL}${Constants.EVENT}`, body);
            const newEvent = await result;
            dispatch(getLogs());
            dispatch({
                type: t.GET_CREATE_EVENT_SUCCESS,
                payload: newEvent.data
            });
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_CREATE_EVENT_FAILURE,
                error: err
            })
        }
    }
};

export const updateEvent = (values, id) => {
    return async dispatch => {
        dispatch({
            type: t.GET_UPDATE_EVENT_REQUEST
        });
        try {
            let body = values;
            body['id'] = id;
            if(body.private === undefined)
                body['private'] = false;
            const result = await axios.put(`${Constants.BASE_URL}${Constants.EVENT}`, {body: body, id: id});
            const newEvent = await result;
            dispatch(getLogs());
            dispatch({
                type: t.GET_UPDATE_EVENT_SUCCESS,
                payload: newEvent.data.event
            });
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_UPDATE_EVENT_FAILURE,
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
                payload: event.data
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

export const updateEventImage = (body,id) => {
    return async dispatch => {
        dispatch({
            type: t.GET_EVENT_IMAGE_REQUEST
        });
        try {
            const result = await axios.put(`${Constants.BASE_URL}${Constants.EVENT}`,{body: body, id: id});
            const event = await result;
            dispatch(getLogs());
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

export const updateEventPics = (image,id) => {
    return async dispatch => {
        dispatch({
            type: t.GET_UPDATE_EVENT_PICS_REQUEST
        });
        try {
            const result = await axios.put(`${Constants.BASE_URL}${Constants.EVENT_PICS}`,{image: image.location, id: id});
            const event = await result;
            dispatch(getLogs());
            dispatch({
                type: t.GET_UPDATE_EVENT_PICS_SUCCESS,
                payload: event.data.event
            });
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_UPDATE_EVENT_PICS_FAILURE,
                error: err
            })
        }
    }
};

export const createComment = (text, authorId, eventId) => {
    return async dispatch => {
        dispatch({
            type: t.GET_CREATE_COMMENT_REQUEST
        });
        try {
            const result = await axios.post(`${Constants.BASE_URL}${Constants.COMMENT}`,{text: text, author: authorId, event: eventId});
            const comment = await result;
            dispatch(getComments(eventId));
            dispatch({
                type: t.GET_CREATE_COMMENT_SUCCESS,
                payload: comment
            });
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_CREATE_COMMENT_FAILURE,
                error: err
            })
        }
    }
};

export const getComments = (id) => {
    return async dispatch => {
        dispatch({
            type: t.GET_COMMENT_REQUEST
        });
        try {
            const result = await axios.get(`${Constants.BASE_URL}${Constants.COMMENT}`, {params: {id: id}});
            const comments = await result;
            dispatch(getLogs());
            // Update payload in reducer on success
            dispatch({
                type: t.GET_COMMENT_SUCCESS,
                payload: comments.data.comments
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_COMMENT_FAILURE,
                error: err
            })
        }
    }
};

export const enrollToEvent = (username, eventId) => {
    return async dispatch => {
        dispatch({
            type: t.GET_ENROLL_REQUEST
        });
        try {
            const result = await axios.post(`${Constants.BASE_URL}${Constants.ENROLL}`, {username: username, eventId: eventId});
            const attendees = await result;
            dispatch(getLogs());
            // Update payload in reducer on success
            dispatch({
                type: t.GET_ENROLL_SUCCESS,
                payload: attendees.data.attendees
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_ENROLL_FAILURE,
                error: err
            })
        }
    }
};

export const unenrollToEvent = (username, eventId) => {
    return async dispatch => {
        dispatch({
            type: t.GET_UNENROLL_REQUEST
        });
        try {
            const result = await axios.post(`${Constants.BASE_URL}${Constants.UNENROLL}`, {username: username, eventId: eventId});
            const attendees = await result;
            dispatch(getLogs());
            // Update payload in reducer on success
            dispatch({
                type: t.GET_UNENROLL_SUCCESS,
                payload: attendees.data.attendees
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_UNENROLL_FAILURE,
                error: err
            })
        }
    }
};

export const getLogs = () => {
    return async dispatch => {
        dispatch({
            type: t.GET_LOG_REQUEST
        });
        try {
            const result = await axios.get(`${Constants.BASE_URL}${Constants.LOG}`);
            const logs = await result;
            dispatch({
                type: t.GET_LOG_SUCCESS,
                payload: logs.data.firstLogs
            });
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_LOG_FAILURE,
                error: err
            })
        }
    }
};

export const getNumberOfAttendees = async (id) => {
    try {
        const result = await axios.get(`${Constants.BASE_URL}${Constants.ATTENDEES}`, {params: {id: id}});
        const attendees = await result;
        return attendees.data.attendees.length;
    } catch (err) {
        console.log(err);
    }
};

export const checkVote = async (event, user) => {
    try {
        const result = await axios.get(`${Constants.BASE_URL}${Constants.VOTES}`, {params: {event: event, user: user}});
        const vote = await result;
        return vote.data !== 'false';
    } catch (err) {
        console.log(err);
    }
};

export const submitVote = (stars, eventId, userId) => {
    return async dispatch => {
        dispatch({
            type: t.GET_VOTE_REQUEST
        });
        try {
            const result = await axios.post(`${Constants.BASE_URL}${Constants.VOTES}`, {
                stars: stars, event: eventId, user: userId
            });
            const event = await result;
            dispatch({
                type: t.GET_VOTE_SUCCESS,
                payload: event.data.event
            });
        } catch (err) {
            dispatch({
                type: t.GET_VOTE_FAILURE,
                error: err
            })
        }
    }
};

export const getUser = (username) => {
    return async dispatch => {
        dispatch({
            type: t.GET_USER_REQUEST
        });
        try {
            const result = await axios.get(`${Constants.BASE_URL}${Constants.USER}`, {params: {username: username}});
            const user = await result;
            // Update payload in reducer on success
            dispatch({
                type: t.GET_USER_SUCCESS,
                payload: user.data
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_USER_FAILURE,
                error: err
            })
        }
    }
};

export const updateUser = (values, id) => {
    return async dispatch => {
        dispatch({
            type: t.GET_UPDATE_USER_REQUEST
        });
        try {
            const result = await axios.put(`${Constants.BASE_URL}${Constants.USER}`, {values: values, id: id});
            const user = await result;
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(user.data));
            dispatch(getLogs());
            dispatch({
                type: t.GET_UPDATE_USER_SUCCESS,
                payload: user.data
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_UPDATE_USER_FAILURE,
                error: err
            })
        }
    }
};

export const inviteUsers = (users, event) => {
    return async dispatch => {
        dispatch({
            type: t.GET_INVITE_REQUEST
        });
        try {
            const result = await axios.post(`${Constants.BASE_URL}${Constants.INVITE}`, {users: users, event: event});
            const attendees = await result;
            dispatch({
                type: t.GET_INVITE_SUCCESS,
                payload: attendees.data.attendees
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_INVITE_FAILURE,
                error: err
            })
        }
    }
};

export const contactUs = (body) => {
    try {
        axios.post(`${Constants.BASE_URL}${Constants.CONTACT_US}`, body);
    } catch (err) {
        console.log(err);
    }
};

export const cancelEvent = (id) => {
    return async dispatch => {
        dispatch({
            type: t.GET_DELETE_EVENT_REQUEST
        });
        try {
            await axios.delete(`${Constants.BASE_URL}${Constants.EVENT}`, {params: {id: id}});
            dispatch({
                type: t.GET_DELETE_EVENT_SUCCESS,
                payload: null
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_DELETE_EVENT_FAILURE,
                error: err
            })
        }
    }
};