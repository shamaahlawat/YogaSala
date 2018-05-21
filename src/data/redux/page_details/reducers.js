import actionTypes from '../action_types';
import initialStates from './states';

export default function page_details(state = initialStates.page_details, action) {
    switch (action.type) {
        case actionTypes.SYST_LANG_SET:
            return {
                ...state,
                lang: action.payload.lang
            };

        case actionTypes.DEVICE_DATA_LOADED:
            return {
                ...state,
                device_data: action.payload.device_data
            };

        case actionTypes.OPEN_USER_LOGIN_MODEL:
            return {
                ...state,
                user_popup_requested: true
            };

        case actionTypes.CLOSE_USER_LOGIN_MODEL:
            return {
                ...state,
                user_popup_requested: false
            };

        case actionTypes.PAGE_CHANGED:
            return {
                ...state,
                current_page: action.payload.current_page,
                page_title: action.payload.page_title,
                page_load_error: false,
                user_popup_requested: false,
                popup_user_loaded: false,
                popup_user: {}
            };

        default:
            return state;
    }
}
