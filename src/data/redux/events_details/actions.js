import actionTypes from '../action_types';
import * as API from '../../config/api';

export function getEvents(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.EVENTS_LIST_LOADING,
        });

        API.getEvents(data, (err, response) => {
            if (!err) {
                dispatch({
                    type: actionTypes.EVENTS_LIST_LOADED,
                    payload: response
                });
            } else {
                dispatch({
                    type: actionTypes.EVENTS_LIST_ERR
                });
            }
        });
    };
}

export function getEventDetails(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.EVENT_DETAILS_LOADING,
        });

        API.getEventDetails(data, (err, response) => {
            if (!err) {
                dispatch({
                    type: actionTypes.EVENT_DETAILS_LOADED,
                    payload: response
                });
            } else {
                dispatch({
                    type: actionTypes.EVENT_DETAILS_ERR
                });
            }
        });
    };
}



