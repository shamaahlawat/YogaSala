import actionTypes from '../action_types';
import * as API from '../../../data/config/api';

export function getServicesDetails(data) {
	return function (dispatch) {
		dispatch({
			type: actionTypes.SERVICES_DETAILS_LOADING,
		});

		API.getServicesDetails(data, (err, response) => {
			if (!err) {
				dispatch({
					type: actionTypes.UPDATE_SERVICES_DETAILS,
					payload: response
				});
				dispatch({
					type: actionTypes.UPDATE_CURRENT_SERVICE_DETAILS,
					payload: response.services[0]
				});
			} else {
				dispatch({
					type: actionTypes.SERVICES_ERROR,
				});
			}
		});
	};
}

export function getEventsImages(data) {
	return function (dispatch) {
		dispatch({
			type: actionTypes.EVENT_IMAGES_LOADING
		});

		API.getEventsImages(data, (err, response) => {
			if (!err) {
				dispatch({
					type: actionTypes.UPDATE_EVENTS_IMAGE,
					payload: response
				});
			} else {
				dispatch({
					type: actionTypes.EVENT_IMAGES_ERROR,
				});
			}
		});
	};
}

export function updateCurrentServiceDetails(data) {
	return function (dispatch) {
		dispatch({
			type: actionTypes.UPDATE_CURRENT_SERVICE_DETAILS,
			payload: data
		});
	};
}

