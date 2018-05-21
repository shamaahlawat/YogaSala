import React, { Component } from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

export default class NewsSection extends Component {
    render() {
        const { icons } = this.props;

        return (
            <div className="full-flex flex-column flex-center homeSection newsSection">
                <Col xs={{ span: 22, offset: 1 }}className="flex-column flex-center tb-pad-50">
                    <div className="is-text-center heading lineHeight">In the news</div>
                    <div className="arrow"><img src={icons.arrow} alt="not found" /></div>
                    <Col xs={24} className="full-flex flex-row flex-ac flex-jsb flex-wrap tb-pad-20">
                        <div className="full-flex advertiser mrgn-10 usa">&nbsp;</div>
                        <div className="full-flex advertiser mrgn-10 fortune">&nbsp;</div>
                        <div className="full-flex advertiser mrgn-10 brite">&nbsp;</div>
                        <div className="full-flex advertiser mrgn-10 forbes">&nbsp;</div>
                        <div className="full-flex advertiser mrgn-10 verbes">&nbsp;</div>
                    </Col>
                </Col>
            </div>
        );
    }
}

NewsSection.propTypes = {
    desktop_view: PropTypes.bool,
    icons: PropTypes.object
};
