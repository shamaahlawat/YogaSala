import actionTypes from '../action_types';
import states from './states';

export default function user_details(state = states.user_details, action) {
    switch (action.type) {
        case actionTypes.USER_SIGNUP_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    user_signup_loading: true,
                    user_signup_success: false,
                }
            };
        
        case actionTypes.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                user:action.payload,
                loaders: {
                    ...state.loaders,
                    user_signup_loading: false,
                    user_signup_success: true,
                    user_login_success: true
                }
            };
        
        case actionTypes.USER_SIGNUP_ERROR:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    user_signup_loading: false,
                    user_signup_success: false,
                }
            };
        
        case actionTypes.USER_LOGIN_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    user_login_loading: true,
                    user_login_success: false,
                }
            };
        
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                user:action.payload,
                loaders: {
                    ...state.loaders,
                    user_login_loading: false,
                    user_login_success: true,
                }
            };

        case actionTypes.USER_LOGIN_ERROR:
            return {
                ...state,
                login_error:action.payload.errors,
                loaders: {
                    ...state.loaders,
                    user_login_loading: false,
                    user_login_success: false,
                }
            };
        
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                user:{},
                loaders: {
                    ...state.loaders,
                    user_login_loading: false,
                    user_login_success: false,
                }
            };
        
        default:
            return state;
    }
}