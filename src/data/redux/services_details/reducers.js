import actionTypes from '../action_types';
import states from './states';

export default function services_details(state = states.services_details, action) {
	switch (action.type) {
		case actionTypes.SERVICES_DETAILS_LOADING:
			return {
				...state,
				loaders: {
					...state.loaders,
					service_details_loading: true,
					service_details_loaded: false,
				}
			};

		case actionTypes.UPDATE_SERVICES_DETAILS:
			// return Object.assign({}, state, action.payload);
			return {
				...state,
				services: action.payload.services,
				loaders: {
					...state.loaders,
					service_details_loading: false,
					service_details_loaded: true
				}
			};

		case actionTypes.EVENT_IMAGES_LOADING:
			return {
				...state,
				loaders: {
					...state.loaders,
					event_images_loading: true,
					event_images_loaded: false
				}
			};

		case actionTypes.UPDATE_EVENTS_IMAGE:
			return {
				...state,
				images: action.payload.images,
				loaders: {
					...state.loaders,
					event_images_loading: false,
					event_images_loaded: true
				}
			};

		case actionTypes.EVENT_IMAGES_ERROR:
			return {
				...state,
				loaders: {
					...state.loaders,
					event_images_loading: false,
				}
			};

		case actionTypes.UPDATE_CURRENT_SERVICE_DETAILS:
			return {
				...state,
				currentService: action.payload
			};
		default:
			return state;
	}
}
