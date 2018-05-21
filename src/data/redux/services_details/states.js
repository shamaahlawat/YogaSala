const states = {
    services_details: {
        services:[],
        images: [],
        currentService:{
                id: 1,
                name: "",
                description: "",
                image: "",
                tags: "",
                sequence: 2,
                testimonials: [
                    {
                        id: 12,
                        name: "",
                        position: "",
                        content: "",
                        image: ""
                    }
                ]
            },
        loaders: {
			service_details_loading: false,
			service_details_loaded: false,
			event_images_loading: false,
			event_images_loaded: false,
        }
    }
};

export default states;
