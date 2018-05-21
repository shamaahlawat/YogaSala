import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router';

import './index.scss';

import * as UTILS from '../data/config/utils';
import * as pageActions from '../data/redux/page_details/actions';

import PrivateRoute from '../components/_privateroute';
import AppHeader from '../components/appheader';
import Footer from '../components/footer';
//containers
import Home from './home';
import AboutUs from './about_us';
import Testimonials from './testimonials';
import ContactUs from './contact_us';
import Event from './events';
import Services from './services';
import UserDocuments from './user_documents';
import BookTickets from './book_tickets';
import EventsDetails from './event_details';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        user_details: state.user_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
    };
}

class AppContainer extends Component {
    componentWillMount() {
        const systLang = UTILS.getLang();
        this.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
        if (systLang) {
            this.props.actions.setLang(systLang);
        }
        this.timeout = false;
    }

    componentDidMount() {
        let self = this;
        window.addEventListener("resize", function () {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                self.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
            }, 300);
        });
        window.scrollTo(0, 0);
    }

    loadPath = (path) => {
        this.props.history.push(path);
    }

    render() {
        const { user_details } = this.props;
        const is_logged_in = !!user_details.user && !!user_details.user.id;

        return (
            <div className="flex-column full-width full-height mainContainer">
                <AppHeader history={this.props.history} />
                <div className="is-no-pad contentContainer">
                    <Router history={this.props.history}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/home" component={Home} />
                            <Route path="/about" component={AboutUs} />
                            <Route path="/testimonials" component={Testimonials} />
                            <Route path="/contactUs" component={ContactUs} />
                            <Route path="/services" component={Services} />
                            <Route path="/events_details" component={EventsDetails} />
                            <Route path="/events">
                                <Switch>
                                    <Route exact path="/events" component={Event} />
                                    <Route exact path="/events/:event_id" component={EventsDetails} />
                                    <Route path="/events/:event_id/book_tickets" component={BookTickets} />
                                </Switch>
                            </Route>
                            <PrivateRoute exact path="/user_documents" component={UserDocuments} isLoggedIn={is_logged_in} />
                        </Switch>
                    </Router>
                </div>
                <Footer loadPath={this.loadPath} />
            </div>
        );
    }
}

AppContainer.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    user_details: PropTypes.object,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AppContainer);
