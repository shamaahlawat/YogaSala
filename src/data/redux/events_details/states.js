const states = {
    events_details: {
        events: [],
        current_event: null,
        loaders: {
            event_list_loading: false,
            event_list_err: false,
            events_details_loading: false,
            event_details_err: false
        }
    }
};

export default states;
