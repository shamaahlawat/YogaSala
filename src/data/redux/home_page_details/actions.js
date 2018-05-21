import actionTypes from '../action_types';
import * as API from '../../../data/config/api';

export function getHomePageDetails(data) {
    return function (dispatch) {
        API.getHomePageDetails(data, (err, response) => {
            if (!err) {
                dispatch({
                    type: actionTypes.UPDATE_HOME_PAGE_DETAILS,
                    payload: response
                });
            } else {
                dispatch({
                    type: actionTypes.HOME_PAGE_ERROR
                });
            }
        });
    };
}

export function getBackgroundImages(data) {
    return function (dispatch) {
        API.getBackgroundImages(data, (err, response) => {
            if (!err) {
                dispatch({
                    type: actionTypes.GET_BACKGROUND_IMAGES,
                    payload: response
                });
            } else {
                dispatch({
                    type: actionTypes.BACKGROUND_IMAGES_ERROR
                });
            }
        });
    };
}



