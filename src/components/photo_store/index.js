import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import './index.scss';

class PhotoStore extends Component {
    render() {
        return (
            <Row>
                <Col xs={{ span: 24 }} className="photoStoreContainer">
                    <Row>
                        <Col md={{ span: 10 }} className="mainImage" style={{ backgroundImage: "url(" + this.props.image.url + ")" }} />
                        <Col md={{ span: 14 }} className="flex flex-wrap flex-jsa">
                            <div className="imageSection" style={{ backgroundImage: "url(" + this.props.image.url + ")" }} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

PhotoStore.propTypes = {
    image: PropTypes.object,
    firstImage: PropTypes.object,
};
export default PhotoStore;
