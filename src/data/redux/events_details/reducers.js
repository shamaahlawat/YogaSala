import actionTypes from '../action_types';
import states from './states';

export default function events_details(state = states.events_details, action) {
    switch (action.type) {
        case actionTypes.EVENTS_LIST_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    event_list_loading: true,
                    event_list_err: false,
                }
            };

        case actionTypes.EVENTS_LIST_LOADED:
            return {
                ...state,
                events: action.payload.events,
                loaders: {
                    ...state.loaders,
                    event_list_loading: false,
                    event_list_err: false,
                }
            };

        case actionTypes.EVENTS_LIST_ERR:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    event_list_loading: false,
                    event_list_err: true,
                }
            };

        case actionTypes.EVENT_DETAILS_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    event_details_loading: true,
                    event_details_err: false,
                }
            };

        case actionTypes.EVENT_DETAILS_LOADED:
            return {
                ...state,
                current_event: action.payload,
                loaders: {
                    ...state.loaders,
                    event_details_loading: false,
                    event_details_err: false,
                }
            };

        case actionTypes.EVENT_DETAILS_ERR:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    event_details_loading: false,
                    event_details_err: true,
                }
            };

        default:
            return state;
    }
}
