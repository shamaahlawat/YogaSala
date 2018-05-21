import React, { Component } from 'react';
import { Col } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

import * as pageActions from '../../data/redux/page_details/actions';
import { icons } from '../../data/assets/assetsurl';
import * as CONSTANTS from '../../data/config/constants';
import PageHeader from '../../components/pageheader';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
    };
}

class AboutUs extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.ABOUT, CONSTANTS.appPages.ABOUT);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="full-flex flex-column aboutContainer t-pad-40 background-color">
                <PageHeader title="About Us" image={icons.header_bg} />
                <Col xs={{ span: 22, offset: 1 }} className="tb-pad-30">
                    <Col xs={{ span: 24 }} md={{ span: 22, offset: 1 }} className="aboutYogasala">
                        <Col xs={{ span: 24 }} md={5} className="t-pad-15 is-text-center imageHeight">
                            <img src={icons.logo} alt="" />
                        </Col>
                        <Col xs={{ span: 22, offset: 1 }} md={18} className="full-flex flex-column lr-pad-15">
                            <div className="b-pad-10 heading-element">Yogasala</div>
                            <div className="description-element">
                                <p className="b-pad-20">
                                    We are a location-independent yoga centre. We travel and create an ambient space for learning yoga - a yōgaśaāla - near you. Join us on this journey exploring the limits of the mind and body.
                                </p>
                                <p>
                                    Are you keen on exploring the limits of your mind and body?To dive deep and explore the limitless potential in yourself? Come, join us on this journey!
                                </p>
                            </div>
                        </Col>
                    </Col>
                </Col>
                <Col xs={{ span: 22, offset: 1 }} className="tb-pad-30">
                    <Col xs={{ span: 24 }} md={{ span: 22, offset: 1 }} className="aboutYogasala">
                        <Col xs={{ span: 24 }} md={5} className="t-pad-15 is-text-center imageHeight">
                            <img src={icons.founder} alt="" />
                        </Col>
                        <Col xs={{ span: 22, offset: 1 }} md={18} className="full-flex flex-column lr-pad-15">
                            <div className="b-pad-10 heading-element">Yogasala</div>
                            <div className="description-element">
                                <p className="b-pad-20">
                                    Hariprasad is an internationally certified (RYT 200 hours) yoga trainer.
                                    He has completed the 1.5 years long Yoga Acharya program (350+ hours) from Yoga Vahini, Hyderabad.
                                </p>
                                <p className="b-pad-20">
                                    Hari teaches in the tradition of Sri T Krishnamacharya that is based on the teachings of Patanjali and focusses on adapting yoga to unique needs and abilities of each individual.
                                    He has received training in yoga and process work based on yoga sutras by internationally
                                    renowned teachers in this tradition like Saraswathi Vasudevan, Srivatsa Ramaswamy, and Raghu Anantanarayanan.
                                </p>
                                <p className="b-pad-20">
                                    Hari is trained in story telling by internationally renowned story teller Deepa Kiran
                                    (Founder - Story Arts India) and collaborates with Deepa to combine the arts of yoga and story telling.
                                </p>
                                <p className="b-pad-20">
                                    Hari founded Yōgaśāla in 2017 as a location-independent centre to spread the teachings of yoga.
                                    Yōgaśāla is the platform where he combines his passions for travel, story telling, yoga and tarot card reading.
                                </p>
                                <p className="b-pad-20">
                                    Hari has taken yoga based corporate wellness workshops and yoga retreats
                                    across India including in Uttar Kashi, Rajasthan, Chattisgarh, Assam, Tripura, Pune, Bangalore, Hyderabad,
                                    Hampi, Ooty and Cochin
                                </p>
                            </div>
                        </Col>
                    </Col>
                </Col>
            </div>
        );
    }
}
AboutUs.propTypes = {
    actions: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(AboutUs);
