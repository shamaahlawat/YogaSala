import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'antd';

import './index.scss';

import { icons } from '../../../../data/assets/assetsurl';
import TestimonialCard from '../../../../components/testimonialcard';

export default class TestimonialList extends Component {
    render() {
        const { testimonials, actions, current_page } = this.props;

        return (
            <div className="flex-column bg-color testimonialListContainer background-color">
                <div
                    className={`flex-column flex-center tb-mrgn-30`}>
                    <span
                        className={`testimonialHeading b-mrg-10 ${current_page}`}
                    >Here's what 200% real people have to say about us</span>
                    <img className={`${current_page}`} src={icons.arrow} alt="not found" />
                </div>
                <div className="testimonialSection">
                    <Col xs={{ span: 22, offset: 1 }}>
                        <Col xs={{ span: 22, offset: 1 }} md={{ span: 10, offset: 1 }}>
                            {testimonials.length > 0 && testimonials.map((testimonial, index) => {
                                if (index % 2 === 0) {
                                    return (
                                        <Col xs={{ span: 24 }} key={index} className={`b-mrgn-50 border animated zoomIn bg-white ${testimonial.source}`}>
                                            <TestimonialCard testimonial={testimonial} style={{ fontSize: '20px' }} />
                                        </Col>
                                    );
                                }
                            })}
                        </Col>
                        <Col xs={{ span: 22, offset: 1 }} md={{ span: 10, offset: 1 }}>
                            {testimonials.length > 0 && testimonials.map((testimonial, index) => {
                                if (index % 2 !== 0) {
                                    return (
                                        <Col xs={{ span: 24 }} key={index} className={`b-mrgn-50 border animated bg-white zoomIn ${testimonial.source}`}>
                                            <TestimonialCard testimonial={testimonial} style={{ fontSize: '20px' }} />
                                        </Col>
                                    );
                                }
                            })}
                        </Col>
                    </Col>
                </div>
                <Col xs={24} className="b-pad-20 flex-row flex-center">
                    <Button
                        className={`flex-center lr-pad-30 tb-pad-5 is-cursor-ptr button ${current_page}`}
                        style={{ height: 'auto' }} onClick={() => { actions.changeView('write'); }}>SUBMIT YOUR STORY</Button>
                </Col>
            </div>
        );
    }
}

TestimonialList.propTypes = {
    testimonials: PropTypes.array,
    actions: PropTypes.object,
    current_page: PropTypes
};
