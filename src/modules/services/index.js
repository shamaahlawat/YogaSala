import React, { Component } from 'react';
import { Col, Tabs } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import { icons } from '../../data/assets/assetsurl';
import * as pageActions from '../../data/redux/page_details/actions';
import * as servicesActions from '../../data/redux/services_details/actions';

import EventTestimonialCard from '../../components/eventtestimonialcard';
import PhotoGrid from '../../components/photogrid';
import SpinnerLoader from '../../components/spinnerloader';

const TabPane = Tabs.TabPane;

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        services_details: state.services_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, servicesActions, pageActions), dispatch)
    };
}

class Services extends Component {
    constructor() {
        super();
        this.handleOfferings = this.handleOfferings.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);

        this.state = {
            mode: 'top'
        };
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.SERVICES, CONSTANTS.appPages.SERVICES);
        this.props.actions.getServicesDetails();
        this.props.actions.getEventsImages();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    navigateTo = (path) => {
        this.props.history.push(path);
    }

    handleModeChange = (e) => {
        const mode = e.target.value;
        this.setState({ mode });
    }

    handleOfferings = (index) => {
        let service = this.props.services_details.services[parseInt(index, 10)];
        this.props.actions.updateCurrentServiceDetails(service);
    };

    render() {

        let { services_details, page_details } = this.props;

        const desktop_view = (page_details.device_data.screen_type !== 'xs' && page_details.device_data.screen_type !== 'sm');

        const actions = {
            navigateTo: this.navigateTo
        };

        if (services_details.loaders.service_details_loading
            || services_details.loaders.event_images_loading) {
            return (
                <div className="full-height bg-default">
                    <SpinnerLoader text="Services loading" />
                </div>
            );
        } else if (services_details.loaders.service_details_loaded
            && services_details.loaders.event_images_loaded) {
            let icon_pad_class = desktop_view ? 'pad-20' : 'pad-10';
            return (
                <div className="flex-column t-pad-40 serviceContainer">
                    {/* {services_details && services_details.services && services_details.services.length > 0 && services_details.services.map((service, index) => {
                        return ( */}
                    <div className={`${icon_pad_class} flex-column flex-jsb background`}>
                        <div className={`${icon_pad_class} flex-row flex-center`}>
                            <div className="flex-column flex-center">
                                <img src={icons.goyoga} />
                                <div className="t-mrgn-10 services"
                                    // onChange={this.handleOfferings}
                                    onClick={() => this.handleOfferings(0)}
                                >{services_details.services[0].name}</div>
                            </div>
                        </div>
                        <div className={` ${icon_pad_class} flex-row flex-jsa yogaServices`}>
                            <div className="flex-column flex-center">
                                <img src={icons.transformation} />
                                <div className="t-mrgn-10 services"
                                    onClick={() => this.handleOfferings(1)}><span>{services_details.services[1].name}</span>
                                </div>
                            </div>
                            <div className="flex-column flex-center">
                                <img src={icons.workshop} />
                                <div className="t-mrgn-10 services"
                                    onClick={() => this.handleOfferings(2)}>{services_details.services[2].name}</div>
                            </div>
                        </div>
                        <div className={`${icon_pad_class} flex-row flex-jsa yogaServices`}>
                            <div className="flex-column flex-center">
                                <img src={icons.wellness} />
                                <div className="t-mrgn-10 services"
                                    onClick={() => this.handleOfferings(3)}>{services_details.services[3].name}
                                </div>
                            </div>
                            <div className="flex-column flex-center">
                                <img src={icons.dojo} />
                                <div className="t-mrgn-10 services"
                                    onClick={() => this.handleOfferings(4)}>{services_details.services[4].name}</div>
                            </div>
                        </div>
                    </div>
                    {/* );
                    })} */}
                    <div className="flex-column ourOfferings bg-primary">
                        <div className="flex-column flex-center heading font-white">
                            Our Offerings
                            <div className="arrowImage">
                                <img src={icons.arrow} alt="not found" />
                            </div>
                        </div>
                        <div className="serviceBannerContainer b-mrgn-60">
                            <Tabs className="bannerElements" onChange={this.handleOfferings} defaultActiveKey="1" animated={true}>
                                {services_details && services_details.services && services_details.services.length > 0 && services_details.services.map((service, index) => {
                                    return (
                                        <TabPane tab={service.name} key={index} className={'bannerelement is-cursor-ptr' + (services_details.currentService.name === service.name ? "active" : "bannerelement")}>
                                            <Col xs={{ span: 22, offset: 1 }} className="bg-primary tb-pad-30">
                                                <EventTestimonialCard desktop_view={desktop_view} type="left_image" event={services_details.currentService} actions={actions} />
                                            </Col>
                                        </TabPane>
                                    );
                                })}
                            </Tabs>
                        </div>
                    </div>

                    <div className="flex-column memories bg-primary">
                        <div className="flex-column flex-center heading font-white tb-pad-40">
                            <span>Some memories from past workshops</span>
                            <div className="arrowImage">
                                <img src={icons.arrow} alt="not found" />
                            </div>
                        </div>
                        <div className="flex-row flex-center b-pad-30">
                            {services_details.images &&
                                <PhotoGrid desktop_view={desktop_view} images={services_details.images} />
                            }
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

Services.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    services_details: PropTypes.object,
    page_details: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Services);
