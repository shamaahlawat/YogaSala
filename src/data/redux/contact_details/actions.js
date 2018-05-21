import actionTypes from '../action_types';
import * as API from '../../config/api';

export function updateContactDetails(path, data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_CONTACT_DETAILS,
            payload: data,
            path: path
        });
    };
}

export function submitContactDetails(data) {
    return function (dispatch) {
        API.submitContactDetails(data, (err, res) => {
            if (!err) {
                dispatch({
                    type: actionTypes.SUBMIT_CONTACT_REQUEST,
                    payload: res
                });
                dispatch({
                    type: actionTypes.SHOW_POPUP
                });
                dispatch({
                    type: actionTypes.CLOSE_POPUP
                });
            }
            else {
                dispatch({
                    type: actionTypes.SUBMIT_CONTACT_REQUEST_ERROR
                });
            }
        });
    };
}




