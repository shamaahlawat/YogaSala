import actionTypes from '../action_types';
// import initialStates from './states';

export function setLang(lang) {
	return function (dispatch) {
		dispatch({
			type: actionTypes.SYST_LANG_SET,
			payload: {
				lang: lang
			}
		});
	};
}

export function setDeviceData(device_data) {
	return function (dispatch) {
		dispatch({
			type: actionTypes.DEVICE_DATA_LOADED,
			payload: {
				device_data: device_data
			}
		});
	};
}

export function pageChanged(page, title) {
	// title = title || initialStates.page_details.page_title;
	return function (dispatch) {
		dispatch({
			type: actionTypes.PAGE_CHANGED,
			payload: {
				current_page: page,
				page_title: title
			}
		});
	};
}

export function openLoginModal() {
    // title = title || initialStates.page_details.page_title;
    return function (dispatch) {
        dispatch({
            type: actionTypes.OPEN_USER_LOGIN_MODEL
        });
    };
}

export function closeLoginModal() {
    // title = title || initialStates.page_details.page_title;
    return function (dispatch) {
        dispatch({
            type: actionTypes.CLOSE_USER_LOGIN_MODEL
        });
    };
}
