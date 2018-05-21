import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

import EventCard from '../../../../components/eventcard';
import HighlightTestimonialCard from '../../../../components/highlighttestimonialcard';

export default class EventSection extends Component {
    render() {
        const { type, events, icons, actions } = this.props;

        if (type === 'hightlight_testimonial') {
            return (
                <div className="full-flex flex-column flex-center tb-pad-30 homeSection HightlighTestimonialSection">
                    <div className="flex-row flex-center flex-wrap full-flex eventsList">
                        {events.map((event, index) => {
                            return (
                                <div key={index} className="flex-row full-flex mrgn-15 eventCardItem flex-center">
                                    <HighlightTestimonialCard event={event} actions={actions} icons={icons} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return (
            <div className="full-flex flex-column flex-center tb-pad-30 homeSection EventSection">
                <div className="is-text-center heading">Events</div>
                <div className="arrow"><img src={icons.arrow} alt="not found" /></div>
                <div className="flex-row flex-center flex-wrap eventsList">
                    {events.map((event, index) => {
                        return (
                            <div key={index} className="flex-row full-flex mrgn-15 eventCardItem flex-center">
                                <EventCard event={event} actions={actions} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

EventSection.propTypes = {
    type: PropTypes.string,
    icons: PropTypes.object,
    events: PropTypes.array,
    desktop_view: PropTypes.bool,
    actions: PropTypes.object
};
