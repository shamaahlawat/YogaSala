import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';
import { icons } from '../../data/assets/assetsurl';

export default class PhotoGrid extends Component {
    state = {
        video_visible: false,
        current_video: null,
        show_modal: false,
        current_media: undefined
    };

    showMedia = (current_media) => {
        console.log(current_media);
        this.setState({
            show_modal: true,
            current_media
        });
    }

    closeMedia = () => {
        if (this.videoRef) {
            this.videoRef.pause();
        }

        this.setState({
            show_modal: false,
            current_media: undefined
        });
    }

    playVideo = (current_video) => {
        this.setState({
            video_visible: true,
            current_video
        });
    }

    closeVideo = () => {
        this.setState({
            video_visible: false,
            current_video: null
        });

        let video = document.getElementById("testimonialVideo");
        if (!video.paused) {
            video.pause();
        }
    }

    render() {
        const { desktop_view, images } = this.props;
        let { current_video, video_visible, show_modal, current_media } = this.state;

        return (
            <div className={`galleryContainer ${!desktop_view ? 'flex-column' : 'flex-row'}`}>
                {images.length && images[1] && images[1].type === 'image' &&
                    <div className="t-mrgn-10 full-flex image mainImage" style={{ backgroundImage: "url(" + images[1].url + ")", maxWidth: (!desktop_view ? '100%' : '40%') }}
                        onClick={() => {
                            this.showMedia(images[1]);
                        }} />
                }

                {images.length && images[1] && images[1].type === 'video' &&
                    <div className="full-flex t-mrgn-10 mainImage" onClick={() => { this.playVideo(images[1]); }}>
                        <div className="mainImage image flex-row flex-center is-cursor-ptr" style={{ backgroundImage: "url(" + images[1].thumb + ")" }}>
                            <div className="play flex-row flex-center "><img src={icons.right_arrow} alt="" /></div>
                        </div>
                    </div>
                }
                <div className=" allImages full-flex flex flex-jc flex-wrap">
                    {images && images.length > 0 && images.map((image, index) => {
                        return (
                            <div key={index}>
                                {image.type === 'image' &&
                                    <div className="imageSection is-cursor-ptr image mrgn-10" style={{ backgroundImage: "url(" + image.url + ")" }}
                                        onClick={() => { this.showMedia(image); }} />
                                }
                                {image.type === 'video' &&
                                    <div className="imageSection is-cursor-ptr image mrgn-10 flex-row flex-center is-cursor-ptr" style={{ backgroundImage: "url(" + image.thumb + ")" }} onClick={() => { this.playVideo(image); }}>
                                        <div className="play flex-row flex-center "><img src={icons.right_arrow} alt="" /></div>
                                    </div>
                                }
                            </div>
                        );
                    })}
                </div>

                <Modal wrapClassName="vertical-center-modal videoModal" width="auto" visible={video_visible && !!current_video} onCancel={() => this.closeVideo()} footer={null}>
                    {current_video &&
                        <video width="100%" height="100%" id="testimonialVideo" autoPlay={true} controls poster={current_video.thumb} loop={false}>
                            <source src={current_video.url} />
                        </video>
                    }
                </Modal>

                <Modal wrapClassName="vertical-center-modal" visible={show_modal} onCancel={() => this.closeMedia()} footer={null}>
                    <div className="full-flex modal-content">
                        {current_media &&
                            <div className="mediaContainer flex-column flex-center flex-wrap">
                                <div className="full-flex imageContainer">
                                    {current_media.type === 'image' && <img src={current_media.url} alt="" />}
                                    {current_media.type === 'video' &&
                                        <video preload="metadata" controls autoPlay ref={ref => this.videoRef = ref}>
                                            <source src={`${current_media.url}#t=0.1`} />
                                        </video>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </Modal>
            </div>
        );
    }
}

PhotoGrid.propTypes = {
    desktop_view: PropTypes.bool,
    images: PropTypes.array
};
