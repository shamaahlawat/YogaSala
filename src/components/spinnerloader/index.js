import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon } from 'antd';

import './index.scss';

export default class SpinnerLoader extends Component {
    render() {
        let { text } = this.props;
        return (
            <Row className="spinnerLoaderContainer">
                <Col xs={{ span: 24 }} className="flex-column flex-center heightFull ">
                    <div className="lr-pad-30 tb-pad-20 bg-white flex-row flex-jc border-radius-3 box-shadow">
                        <Icon type="loading" className="font-40 font-primary" />
                        <div className="l-mrgn-20 flex-column flex-jc font-16 font-primary is-capitalize"><span>{text ? text : "Loading"} ...</span></div>
                    </div>
                </Col>
            </Row>
        );
    }
}

SpinnerLoader.propTypes = {
    text: PropTypes.string,
};
