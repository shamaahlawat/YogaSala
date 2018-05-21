import actionTypes from '../action_types';
import * as API from '../../../data/config/api';
import { message } from 'antd';

export function userLogin(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.USER_LOGIN_LOADING,
        });
        API.userLogin(data, (err, response) => {
            if (!err) {
                localStorage.setItem("user", JSON.stringify(response));
                dispatch({
                    type: actionTypes.USER_LOGIN_SUCCESS,
                    payload: response
                });
                message.success(`Welcome back ${response.name}`);
            } else {
                dispatch({
                    type: actionTypes.USER_LOGIN_ERROR,
                    payload: response
                });
                message.error("Sign up error!");
            }
        });
    };
}

export function userSignup(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.USER_SIGNUP_LOADING,
        });
        API.userSignup(data, (err, response) => {
            if (!err) {
                localStorage.setItem("user", JSON.stringify(response));
                dispatch({
                    type: actionTypes.USER_SIGNUP_SUCCESS,
                    payload: response
                });
                message.success(`Welcome ${response.name}`);
            } else {
                dispatch({
                    type: actionTypes.USER_SIGNUP_ERROR,
                    payload: response
                });
                message.error("Sign up error!");
            }
        });
    };
}

export function logoutUser() {
    return function (dispatch) {
        localStorage.removeItem("user");
        dispatch({
            type: actionTypes.USER_LOGOUT,
        });

        message.success("You are now logged out!");
    };
}

export function userFacebookCallback(data, callback) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.USER_SIGNUP_LOADING,
        });
        API.userFacebookCallback(data, (err, response) => {
            if (!err) {
                localStorage.setItem("user", JSON.stringify(response));
                dispatch({
                    type: actionTypes.USER_SIGNUP_SUCCESS,
                    payload: response
                });
                callback(null);
                message.success(`Welcome ${response.name}`);
            } else {
                dispatch({
                    type: actionTypes.USER_SIGNUP_ERROR,
                    payload: response
                });
                callback(true);
                message.error("Sign up error!");
            }
        });
    };
}

export function userGoogleCallback(data, callback) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.USER_SIGNUP_LOADING,
        });
        API.userGoogleCallback(data, (err, response) => {
            if (!err) {
                localStorage.setItem("user", JSON.stringify(response));
                dispatch({
                    type: actionTypes.USER_SIGNUP_SUCCESS,
                    payload: response
                });
                callback(null);
                message.success(`Welcome ${response.name}`);
            } else {
                dispatch({
                    type: actionTypes.USER_SIGNUP_ERROR,
                    payload: response
                });
                callback(true);
                message.error("Sign up error!");
            }
        });
    };
}


