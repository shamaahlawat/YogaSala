import actionTypes from '../action_types';
import * as API from '../../../data/config/api';

export function getTestimonialsDetails(data) {
    return function (dispatch) {
        API.getTestimonialsDetails(data, (err, response) => {
            if (!err) {
                dispatch({
                    type: actionTypes.UPDATE_TESTIMONIALS_DETAILS,
                    payload: response
                });
            } else {
                dispatch({
                    type: actionTypes.TESTIMONIALS_ERROR,
                });
            }
        });
    };
}



