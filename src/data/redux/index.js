import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import page_details from './page_details/reducers';
import user_details from './user_details/reducers';
import testimonials_details from './testimonials_details/reducers';
import events_details from './events_details/reducers';
import home_page_details from './home_page_details/reducers';
import services_details from './services_details/reducers';
import order_details from './order_details/reducers';
import contact_details from './contact_details/reducers';

const rootReducer = combineReducers({
    user_details,
    page_details,
    contact_details,
    testimonials_details,
    home_page_details,
    events_details,
    services_details,
    order_details,
    routing: routerReducer
});

export default rootReducer;
