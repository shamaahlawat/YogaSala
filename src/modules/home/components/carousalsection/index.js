import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Carousel } from 'antd';
import { Carousel as ResponsiveCarousal } from 'react-responsive-carousel';

import './index.scss';

export default class CarousalSection extends Component {
    state = {
        loaded: false
    };

    componentDidMount() {
        this.loaded();
    }

    loaded = () => {
        this.setState({ loaded: true});
    }

    render() {
        const { type, items, desktop_view, icons } = this.props;
        const { loaded } = this.state;

        const settings = {
            showArrows: true,
            showStatus: false,
            showThumbs: false,
            infiniteLoop: true,
            autoPlay: (items.length > 1),
            dynamicHeight: true
        };

        if (loaded && type === 'main_carousal') {
            return (
                <Col xs={24} className={`full-flex is-relative mainCarousal CarousalSection ${desktop_view ? 'desktop' : 'mobile'}`}>
                    <Carousel autoplay={(items.length > 1)} >
                        {items.map((backgroundImage, index) => {
                            return (
                                <div key={index} >
                                    <img src={backgroundImage} className="mainImage img-contain" />
                                </div>
                            );
                        })}
                    </Carousel>
                    <div className="flex-column flex-center is-absolute textSection">
                        <div className="lineOne">Explore</div>
                        <div className="lineTwo">your mind & body</div>
                    </div>
                </Col>
            );
        } else if (type === 'testimonial_carousal') {
            return (
                <Col xs={24} className={`full-flex flex-column flex-center is-relative homeSection testimonialCarousal CarousalSection ${desktop_view ? 'desktop' : 'mobile'}`}>
                    <img src={icons.logo} alt="" height="82" />
                    <ResponsiveCarousal {...settings}>
                        {items.map((testimonial, index) => {
                            return (
                                <div key={index} className="flex-column flex-center testimonialItem tb-pad-10">
                                    <div className="statement tb-mrgn-20">
                                        <p>{testimonial.content}</p>
                                    </div>
                                    <div className="flex-column flex-center b-pad-20 user">
                                        <div className="profile b-mrgn-10" style={{ backgroundImage: "url(" + testimonial.image + ")" }}>&nbsp;</div>
                                        <div className="is-text-center display name">{testimonial.name}</div>
                                        <div className="is-text-center display profession b-mrgn-10">{testimonial.position}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </ResponsiveCarousal>
                </Col>
            );
        }

        return null;
    }
}

CarousalSection.propTypes = {
    type: PropTypes.string,
    items: PropTypes.array,
    desktop_view: PropTypes.bool,
    icons: PropTypes.object
};
