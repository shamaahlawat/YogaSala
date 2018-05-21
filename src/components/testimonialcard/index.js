import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

import { icons } from '../../data/assets/assetsurl';

class TestimonialCard extends Component {
    constructor() {
        super();
        this.playVideo = this.playVideo.bind(this);
    }

    playVideo = (id) => {
        let video_id = document.getElementById(id);
        if (video_id.paused) {
            video_id.play();
        } else {
            video_id.pause();
        }
    }

    render() {
        const { testimonial } = this.props;

        return (
            <div className="flex-column testimonialContainer" xs={{ span: 24 }}>
                <div className="flex-row full-flex userContainer">
                    <div className="flex-row full-flex flex-ac">
                        <div className="r-mrgn-10 profile" style={{ backgroundImage: "url(" + testimonial.image + ")" }}>&nbsp;</div>
                        <div className="full-flex flex-jc flex-column nameSection l-mrgn-10">
                            <div className="name b-mrgn-10">{testimonial.name}</div>
                            <div className="profession">{testimonial.position}</div>
                        </div>
                        <img src={icons[`testimonial_${testimonial.source.toLowerCase()}`]} alt="" />
                    </div>
                </div>
                {testimonial.type === 'image' &&
                    <div className="full-flex tb-mrgn-20 testimonialImage" style={{ backgroundImage: "url(" + testimonial.image + ")" }}>&nbsp;</div>
                }

                {testimonial.type === 'video' &&
                    <div className="full-flex tb-mrgn-20  video">
                        <video width="100%" height="100%" id={testimonial.id} controls poster={testimonial.thumb}>
                            <source src={testimonial.image} />
                        </video>
                    </div>
                }
                <div className="content tb-pad-20" xs={{ span: 24 }} style={this.props.style}>
                    {testimonial.content}
                </div>
                {
                    testimonial.event &&
                    <div className="full-flex flex-column flex-afe venue">
                        <div className="col">- <span>attended</span> YOGASHALA <span>in</span> {testimonial.event.name}
                        </div>
                        <div className="col">{testimonial.event.date_string}</div>
                    </div>
                }
            </div>
        );
    }
}

TestimonialCard.propTypes = {
    testimonial: PropTypes.object,
    style: PropTypes.object
};

export default (TestimonialCard);
