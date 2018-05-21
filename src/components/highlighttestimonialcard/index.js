import React, { Component } from 'react';
import { Card, Modal } from 'antd';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import './index.scss';

export default class HighlightTestimonialCard extends Component {
    state = {
        video_visible: false
    }

    componentWillMount() {
        this.setState({
            video_visible: false
        });
    }

    playVideo = () => {
        this.setState({
            video_visible: true,
        });
    }

    closeVideo = () => {
        this.setState({
            video_visible: false,
        });

        let video = document.getElementById("testimonialVideo");
        if (!video.paused) {
            video.pause();
        }
    }

    render() {
        const { event, icons } = this.props;

        return (
            <Card className="animated zoomIn full-flex is-relative HighlightTestimonialCard" bordered={false}>
                <div className="imageContainer">
                    {event.type === 'image' &&
                        <div className="coverPic" style={{ backgroundImage: "url(" + event.image + ")" }}>&nbsp;</div>
                    }
                    {event.type === 'video' &&
                        <div className="videoContainer is-cursor-ptr" onClick={() => { this.playVideo(); }}>
                            <div className="flex-row flex-center coverPic" style={{ backgroundImage: "url(" + event.thumb + ")" }}>
                                <div className="flex-row flex-center pad-15 thumb"><img src={icons.play_button} alt="" /></div>
                            </div>
                        </div>
                    }
                </div>
                <div className="pad-20 flex-column cardContent">
                    <div className="title">{event.content}</div>
                    <div className="t-mrgn-10 flex flex-row flex-ac flex-jsb userContainer">
                        <div className="flex-row full-flex flex-ac">
                            <div className="r-mrgn-10 profile" style={{ backgroundImage: "url(" + event.image + ")" }}>&nbsp;</div>
                            <div className="full-flex flex-jc flex-column nameSection l-mrgn-10">
                                <div className="name">
                                    {event.name}
                                </div>
                                <div className="time">
                                    <Moment fromNow ago>{event.created_at}</Moment>
                                    <span> ago</span>
                                </div>
                            </div>
                        </div>
                        <img src={icons[event.source.toLowerCase()]} alt="" />
                    </div>
                </div>
                <Modal title={`Posted by ${event.name}`} wrapClassName="vertical-center-modal videoModal" width="auto" visible={this.state.video_visible} onCancel={() => this.closeVideo()} footer={null}>
                    <video width="100%" height="100%" id="testimonialVideo" autoPlay={true} controls poster={event.thumb} loop={false}>
                        <source src={event.image} />
                    </video>
                </Modal>
            </Card>
        );
    }
}

HighlightTestimonialCard.propTypes = {
    event: PropTypes.object.isRequired,
    icons: PropTypes.object,
    actions: PropTypes.object
};
