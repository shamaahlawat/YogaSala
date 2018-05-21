import React, { Component } from 'react';
import { Col } from 'antd/lib/grid';
import PropTypes from 'prop-types';

import './index.scss';

export default class PageHeader extends Component {
    render() {
        const { title, image } = this.props;
        return (
            <Col xs={24} className="full-flex flex-column flex-jfe pageHeader" style={{ backgroundImage: `url(${image})` }}>
                <Col xs={{ span: 20, offset: 1 }} md={{ span: 20, offset: 2 }}>
                    <div className="top-element">{title}</div>
                </Col>
            </Col>
        );
    }
}

PageHeader.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string
};
