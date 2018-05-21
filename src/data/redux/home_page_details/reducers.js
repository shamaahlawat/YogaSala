import actionTypes from '../action_types';
import states from './states';

export default function home_page_details(state = states.homePageDetails, action) {
    switch (action.type) {
        case actionTypes.UPDATE_HOME_PAGE_DETAILS:
            return Object.assign({}, state, action.payload);

        case actionTypes.GET_BACKGROUND_IMAGES:
            return Object.assign({}, state, action.payload);
            
        default:
            return state;
    }
}
