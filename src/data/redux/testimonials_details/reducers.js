import actionTypes from '../action_types';
import states from './states';

export default function testimonials_details(state = states, action) {
    switch (action.type) {
        case actionTypes.UPDATE_TESTIMONIALS_DETAILS:
            return {
                testimonials: action.payload
            };
        default:
            return state;
    }
}
