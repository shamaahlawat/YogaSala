import React, { Component } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

export default class Eventcard extends Component {
    render() {
        const { event, actions } = this.props;

        return (
            <Card className="animated zoomIn full-flex is-relative EventCard" onClick={() => actions.navigateTo(`/events/${event.id}`)} bordered={false}>
                <div className="full-width imageContainer">
                    <div className="coverPic" style={{ backgroundImage: "url(" + event.image + ")" }}>&nbsp;</div>
                </div>
                <div className="pad-20 overlay cardContent">
                    <div className="title">{event.name}</div>
                    <div className="flex-column description">
                        <p>{event.date_string}</p>
                        <p>{event.description}</p>
                    </div>
                    <div className="t-mrgn-20 caption">
                        <div className="t-pad-20 description">{event.brief_description}</div>
                        <div className="flex flex-wrap pad-5 tags">
                            {
                                event.tags.split(",").map((tag, index) => {
                                    return (
                                        <div className="b-mrgn-10 r-mrgn-5 hashTagPills" key={index}>{tag}</div>
                                    );
                                }
                                )}
                        </div>
                        <div className="t-mrgn-10 moreDetails">More Details</div>
                    </div>
                </div>
                <div className="pad-20 flex-column notOverlay cardContent">
                    <div className="title">{event.name}</div>
                    <div className="flex-column description">
                        <p>{event.date_string}</p>
                        <p>{event.description}</p>
                    </div>
                </div>
            </Card>
        );
    }
}

Eventcard.propTypes = {
    event: PropTypes.object.isRequired,
    actions: PropTypes.object
};
