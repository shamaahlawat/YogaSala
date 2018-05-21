import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class EventTestimonialCard extends Component {
    render() {
        let { type, desktop_view, event, actions } = this.props;
        return (
            <div className={`EventTestimonialCard ${desktop_view ? 'flex-row' : 'flex-column mobile'}`}>
                <div className="full-flex imageContainer" style={{ backgroundImage: "url(" + event.image + ")", order: type === 'left_image' ? 0 : 1 }}>&nbsp;</div>

                <div className="flex-column flex-jsa detailsContainer">
                    <div className="pad-15 content flex-column">
                        <div className="title">{event.name}</div>
                        <div className="flex-column description">
                            <span>{event.date_string}</span>
                            <span>{event.location}</span>
                        </div>
                        <div className="t-mrgn-20 t-pad-5 caption">
                            <div className="flex flex-wrap pad-5 tags">
                                {event.tags.split(',').map((tag, index) => {
                                    return (
                                        <div className="tb-mrgn-5 r-mrgn-5 hashTagPills" key={index}>{tag}</div>
                                    );
                                })}
                            </div>
                            <div className="t-pad-20 description">{event.brief_description}</div>
                        </div>
                    </div>
                    {event.testimonials && event.testimonials.map((testimonial, index) => {
                        return (
                            <div className="testimonial tb-pad-20 t-mrgn-10" key={index}>
                                <div className="flex flex-ac">
                                    <div className="profile" style={{ backgroundImage: "url(" + testimonial.image + ")" }} />
                                    <div className="flex-column testimonialText">
                                        <span>{testimonial.content}</span>
                                        <div className="is-font-bold">{testimonial.name},{testimonial.position}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="pad-15 flex-row flex-center buttonContainer">
                        <div className="flex-row flex-center is-cursor-ptr register" onClick={() => actions.navigateTo(`/events/${event.latest_event_id || event.id}`)}>REGISTER NOW</div>
                    </div>
                </div>
            </div>
        );
    }
}

EventTestimonialCard.propTypes = {
    desktop_view: PropTypes.bool,
    event: PropTypes.object,
    type: PropTypes.string,
    actions: PropTypes.object
};
