import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

import { icons } from './data/assets/assetsurl';
import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as homePageActions from '../../data/redux/home_page_details/actions';

import SusbscribeSection from './components/subscribesection';
import CarousalSection from './components/carousalsection';
import AboutusSection from './components/aboutussection';
import EventSection from './components/eventsection';
import NewsSection from './components/newssection';


function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        home_page_details: state.home_page_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, homePageActions, pageActions), dispatch)
    };
}

class Home extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.HOME, CONSTANTS.appPages.HOME);
        this.props.actions.getHomePageDetails();
        this.props.actions.getBackgroundImages();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    navigateTo = (path) => {
        this.props.history.push(path);
    }

    render() {
        let { page_details, home_page_details } = this.props;
        const desktop_view = (page_details.device_data.screen_type !== 'xs' && page_details.device_data.screen_type !== 'sm');

        const actions = {
            navigateTo: this.navigateTo
        };

        return (
            <div className="homeContainer flex-column">
                <CarousalSection type="main_carousal" desktop_view={desktop_view} icons={icons} items={home_page_details.background_images} />
                <AboutusSection desktop_view={desktop_view} icons={icons} />
                <EventSection type="event" events={home_page_details.events} desktop_view={desktop_view} actions={actions} icons={icons} />
                <CarousalSection type="testimonial_carousal" desktop_view={desktop_view} icons={icons} items={home_page_details.testimonials} />
                <SusbscribeSection desktop_view={desktop_view} icons={icons} />
                <EventSection type="hightlight_testimonial" events={home_page_details.testimonials_highlighted} desktop_view={desktop_view} actions={actions} icons={icons} />
                <NewsSection desktop_view={desktop_view} icons={icons} />
            </div>
        );
    }
}

Home.propTypes = {
    home_page_details: PropTypes.object,
    page_details: PropTypes.object,
    testimonial: PropTypes.object,
    history: PropTypes.object,
    actions: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
