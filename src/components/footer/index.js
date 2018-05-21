import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon } from 'antd';

import { icons } from '../../data/assets/assetsurl';
import './index.scss';

export default class Footer extends Component {
    render() {
        return (
            <Col md={{ span: 24 }}>
                <div className="footerContainer">
                    <Col md={{ span: 16, offset: 4 }} className="flex-center flex-column footer">
                        <div className="logo" onClick={() => { this.props.loadPath('/events'); }}><img src={icons.footer_logo} alt="" /></div>
                        <div className="flex flex-center flex-wrap listItems is-cursor-ptr">
                            <div className="pad-10 item" onClick={() => { this.props.loadPath('/home'); }}>HOME</div>
                            <div className="mar-10 circle" />
                            <div className="pad-10 item" onClick={() => { this.props.loadPath('/events'); }}>EVENTS</div>
                            <div className="mar-10 circle" />
                            <div className="pad-10 item" onClick={() => { this.props.loadPath('/services'); }}>SERVICES</div>
                            <div className="mar-10 circle" />
                            <div className="pad-10 item " onClick={() => { this.props.loadPath('/testimonials'); }}>TESTIMONIALS</div>
                            <div className="mar-10 circle " />
                            {/* <div className="pad-10 item">BLOG</div>
                            <div className="mar-10 circle" /> */}
                            <div className="pad-10 item" onClick={() => { this.props.loadPath('/about'); }}>ABOUT</div>
                            <div className="mar-10 circle" />
                            <div className="pad-10 item " onClick={() => { this.props.loadPath('/contactUs');}}>CONTACT US</div>
                        </div>
                        <div className="flex socialMedia">
                            <a className="flex-row flex-center is-cursor-ptr socialContainer img-circular facebook" href="https://www.facebook.com/yogasalain/">
                                <Icon className="socialIcon font-xl" type="facebook" />
                            </a>
                            <a className="flex-row flex-center is-cursor-ptr socialContainer img-circular instagram" href="https://www.instagram.com/yogasalain/?hl=en">
                                <Icon className="socialIcon font-xl" type="instagram" />
                            </a>
                            <a className="flex-row flex-center is-cursor-ptr socialContainer img-circular twitter" href="https://twitter.com/yogasalain">
                                <Icon className="socialIcon font-xl" type="twitter" />
                            </a>
                        </div>
                        <div className="copyRight">YOGASALA © {new Date().getFullYear()} | All Rights Reserved</div>
                    </Col>
                </div>
            </Col>
        );
    }
}

Footer.propTypes = {
    loadPath: PropTypes.func
};
