import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'antd';

import * as pageActions from '../../data/redux/page_details/actions';
import * as eventsActions from '../../data/redux/events_details/actions';
import * as CONSTANTS from '../../data/config/constants';
import { icons } from '../../data/assets/assetsurl';

import './index.scss';
import EventTestimonialCard from '../../components/eventtestimonialcard';
import SpinnerLoader from '../../components/spinnerloader';

function mapStateToProps(state) {
    return {
        events_details: state.events_details,
        page_details: state.page_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, eventsActions, pageActions), dispatch)
    };
}

class Event extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.EVENTS, CONSTANTS.appPages.EVENTS);
        this.props.actions.getEvents();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    navigateTo = (path) => {
        this.props.history.push(path);
    }

    exploreEvents = () => {
        let EventsDiv = ReactDOM.findDOMNode(this.eventListContainer).getBoundingClientRect();
        window.scrollTo(0, EventsDiv.top - 40);
    }

    render() {
        let { events_details, page_details } = this.props;
        let { events } = events_details;

        const desktop_view = (page_details.device_data.screen_type !== 'xs' && page_details.device_data.screen_type !== 'sm');

        const actions = {
            navigateTo: this.navigateTo
        };

        const loading = events_details.loaders.event_list_loading;
        const err = events_details.loaders.event_list_err;

        return (
            <div className="flex-column t-mrgn-40 eventContainer">
                <div className="flex flex-center background bounceInLeft pad-30">
                    <Col xs={{ span: 24, offset: 0 }} md={{ span: 10, offset: 14 }} lg={{ span: 9, offset: 15 }} className={`yogaInspiration flex-column ${desktop_view ? '' : 'tb-pad-30 flex-center'}`}>
                        <div className={`yogaBegins flex-column ${desktop_view ? '' : 'flex-center'}`}>
                            <div className="inspiration">Where Inspiration</div>
                            <div className="begin">Begins</div>
                        </div>
                        <div className={`aboutYoga tb-mrgn-10 flex-column ${desktop_view ? '' : 'is-text-center'}`}>
                            <span>Something special happens when our studentsbring their mats together at Yogasala’s yoga events.</span>
                            <span>If you are seeking to deepen your practice, transform yoga into a lifestyle, and connect with fellow yogis, this is where it happens </span>
                        </div>
                        <Col xs={16} sm={10} md={16} lg={12} className="buttonSection">
                            <div className="t-mrgn-20 flex-row flex-center button" onClick={this.exploreEvents}>EXPLORE NOW</div>
                        </Col>
                    </Col>
                </div>
                <div className="bg-primary flex-column full-flex b-pad-30" ref={(ref) => { this.eventListContainer = ref; }}>
                    <div className="tb-pad-30 flex-column flex-center">
                        <div className="heading events font-white">Our Events</div>
                        <div style={{ marginTop: "-7px" }}><img src={icons.arrow} alt="not found" /></div>
                    </div>
                    {loading &&
                        <Col xs={{ span: 22, offset: 1 }} className="flex-row flex-center mrgn-40">
                            <SpinnerLoader text="Events loading" />
                        </Col>
                    }
                    {!loading && !err && events.map((event, index) => {
                        return (
                            <Col key={index} xs={{ span: 22, offset: 1 }} className="b-mrgn-40">
                                <EventTestimonialCard desktop_view={desktop_view} type={index % 2 === 0 ? 'left_image' : 'right_image'} event={event} actions={actions} />
                            </Col>
                        );
                    })}
                    {err &&
                        <Col xs={{ span: 22, offset: 1 }} className="flex-row flex-center pad-40">
                            <span>Error loading events please reload</span>
                        </Col>
                    }
                </div>
            </div>
        );
    }
}

Event.propTypes = {
    actions: PropTypes.object,
    events_details: PropTypes.object,
    page_details: PropTypes.object,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
