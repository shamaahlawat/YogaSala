import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

import { icons } from '../../data/assets/assetsurl';
import * as pageActions from '../../data/redux/page_details/actions';
import * as eventActions from '../../data/redux/events_details/actions';
import * as testimonialsActions from '../../data/redux/testimonials_details/actions';
import * as servicesActions from '../../data/redux/services_details/actions';

import TabContainer from './components/tabContainer';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        events_details: state.events_details,
        testimonials_details: state.testimonials_details,
        services_details: state.services_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, eventActions, pageActions, testimonialsActions, servicesActions), dispatch)
    };
}

class EventsDetails extends Component {

    componentWillMount() {
        this.props.actions.getEventDetails(this.props.match.params.event_id);
    }

    render() {
        let { events_details, page_details } = this.props;

        const desktop_view = (page_details.device_data.screen_type !== 'xs' && page_details.device_data.screen_type !== 'sm');

        return (
            <div className="full-height bg-default t-mrgn-50 eventsContainer background-color">
                {events_details.current_event !== null &&
                    <Col xs={{ span: 24 }} className="eventDetailsContainer">
                        <Col xs={24} className="eventDetailsContainer">
                            <div className="eventBackgroundImage" style={{
                                backgroundImage: "url(" +
                                    events_details.current_event.cover_image + ")"
                            }} />
                            <Col xs={{ span: 22, offset: 1 }}
                                className={'eventDetails' + (events_details.current_event.cover_image !== null ? "topMargin font-white " : "is-no-t-mrgn font-primary ")}
                                style={{ marginTop: "-90px" }}
                            >
                                <Col xs={24} sm={10} md={10}>
                                    <div className="imageContainer">
                                        <img src={events_details.current_event.profile_image} />
                                    </div>
                                </Col>
                                <Col xs={24} md={{ span: 11, offset: 1 }}>
                                    <div className="eventName">{events_details.current_event.name}</div>
                                    <div className="flex-row flex-wrap">
                                        {
                                            events_details.current_event.tags.split(",").map((tag, index) => {
                                                return (
                                                    <div className="b-mrgn-10 r-mrgn-5 hashTagPills" key={index}>{tag}</div>
                                                );
                                            }
                                            )}
                                    </div>
                                    <div className="t-pad-10 flex-row flex-ac">
                                        <div className="flex-row time flex-center">
                                            <div className="r-pad-5">
                                                <img src={icons.time} />
                                            </div>
                                            <div className="t-mrgn-5">Time</div>
                                        </div>
                                        <div className="description l-pad-20">{events_details.current_event.date_string}</div>
                                    </div>
                                    <div className="tb-pad-10 flex-row flex-ac">
                                        <div className="time flex-row flex-center">
                                            <div className="r-pad-5">
                                                <img src={icons.location} />
                                            </div>
                                            <div className="t-mrgn-5">Venue</div>
                                        </div>
                                        <div className="description l-pad-20">{events_details.current_event.location} </div>
                                    </div>
                                    <div className="registerButton is-cursor-ptr"
                                        onClick={() => this.props.history.push(`/events/${events_details.current_event.id}/book_tickets`)}>REGISTER NOW</div>
                                </Col>
                            </Col>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 22, offset: 1 }}>
                            <TabContainer actions={this.props.actions}
                                information_categories={events_details.current_event.information_categories} desktop_view={desktop_view} />
                        </Col>
                    </Col>
                }
            </div>
        );
    }
}

EventsDetails.propTypes = {
    actions: PropTypes.object,
    testimonials_details: PropTypes.object,
    services_details: PropTypes.object,
    page_details: PropTypes.object,
    match: PropTypes.object,
    events_details: PropTypes.object,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsDetails);
