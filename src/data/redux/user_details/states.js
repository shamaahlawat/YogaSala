let user = localStorage.getItem('user');

const states = {
    user_details: {
        user: user && (user != 'undefined') ? JSON.parse(localStorage.getItem('user')) : null,
        loaders: {
            user_login_loading: false,
            user_login_success: false,
            user_login_error: false,
            user_signup_loading: false,
            user_signup_success: false,
            user_signup_error: false,
        }
    },
};

export default states;
