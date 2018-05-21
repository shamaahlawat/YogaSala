import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect} from 'react-router-dom';

export default class PrivateRoute extends Component {
    render() {
        const { isLoggedIn, component: Component, ...rest } = this.props;

        return (
            <Route {...rest}
                render={props => isLoggedIn ?
                    <Component {...props} /> :
                    <Redirect to={{ pathname: "/" }} />
                }
            />
        );
    }
}

PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    component: PropTypes.func.isRequired
};

