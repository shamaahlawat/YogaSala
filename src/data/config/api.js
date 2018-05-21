import axios from 'axios';

import * as CONSTANTS from './constants';

const method_types = {
    get: "GET",
    post: "POST"
};

function getHeaders() {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    let headers = {
        'Content-Type': 'application/json'
    };

    if (user && user.id && user.authentication_token) {
        headers.userid = user.uid || user.id;
        headers.usertoken = user.authentication_token;
    }
    return headers;
}

function fetchDataAndProceed(url, method, data, callback) {
    axios({
        method: method,
        params: method === 'GET' ? data : {},
        data: method !== 'GET' ? data : {},
        url: url,
        baseURL: CONSTANTS.base_url,
        headers: getHeaders(),
        validateStatus: function (status) {
            return ((status >= 200 && status < 300) || status === 412 || status === 401 || status === 403);
        },
    }).then(function (response) {
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('user');
            response.data.status = response.status;
            callback(true, response.data);
        }
        else {
            callback(false, response.data);
        }
    }).catch(function (error) {
        callback(true, { error });
    });
}

// ----CONTACT INFO API ---
export const submitContactDetails = (data, callback) => {
    fetchDataAndProceed('/enquiries.json', method_types.post, data, callback);
};

export const getTestimonialsDetails = (data, callback) => {
    fetchDataAndProceed('/testimonials.json', method_types.get, data, callback);
};

export const createTestimonials = (data, callback) => {
    let payload = new FormData();
    if (data.file && data.file.length > 0) {
        payload.append('testimonial[image]', data.file[0]);
    }
    payload.append('testimonial[name]', data.name);
    payload.append('testimonial[content]', data.description);
    payload.append('testimonial[user_title]', data.title);
    payload.append('testimonial[event_id]', data.event);
    payload.append('testimonial[user_id]', data.user_id);

    let headers = getHeaders();
    headers['content-type'] = 'multipart/form-data';
    const config = {
        baseURL: CONSTANTS.base_url,
        headers
    };

    axios.post('/testimonials.json', payload, config).then(function (response) {
        if (response.status === 401 || response.status === 403) {
            localStorage.setItem('user', null);
            response.data.status = response.status;
            callback(true, response.data);
        }
        else {
            callback(false, response.data);
        }
    }).catch(function (error) {
        callback(true, { error });
    });
};

export const getHomePageDetails = (data, callback) => {
    fetchDataAndProceed('/home', method_types.get, data, callback);
};

export const getEvents = (data, callback) => {
    fetchDataAndProceed('/events.json', method_types.get, data, callback);
};

export const getEventDetails = (data, callback) => {
    fetchDataAndProceed('/events/' + data + '.json', method_types.get, data, callback);
};

export const getServicesDetails = (data, callback) => {
    fetchDataAndProceed('/services', method_types.get, data, callback);
};

export const getEventsImages = (data, callback) => {
    fetchDataAndProceed('/images.json', method_types.get, data, callback);
};

export const submitOrderDetails = (data, callback) => {
    fetchDataAndProceed('/orders.json', method_types.post, data, callback);
};

export const userFacebookCallback = (data, callback) => {
    fetchDataAndProceed('/users/auth/facebook/callback.json', method_types.post, data, callback);
};

export const userGoogleCallback = (data, callback) => {
    fetchDataAndProceed('/users/auth/google_oauth2/callback.json', method_types.post, data, callback);
};

export const userLogin = (data, callback) => {
    fetchDataAndProceed('/users/sign_in.json', method_types.post, data, callback);
};

export const userSignup = (data, callback) => {
    fetchDataAndProceed('/users.json', method_types.post, data, callback);
};

export const getDocumentTypes = (data, callback) => {
    fetchDataAndProceed('/user_notes.json', method_types.get, data, callback);
};

export const getUserDocuments = (data, callback) => {
    fetchDataAndProceed('/user_notes.json', method_types.get, data, callback);
};

export const getBackgroundImages = (data, callback) => {
    fetchDataAndProceed('/pages?home=true', method_types.get, data, callback);
};

export const updatePaymentStatus = (data, callback) => {
    fetchDataAndProceed('/ orders/capture_payment.json', method_types.post, data, callback);
};


