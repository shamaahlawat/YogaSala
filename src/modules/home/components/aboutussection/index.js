import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class AboutusSection extends Component {
    render() {
        const { icons } = this.props;

        return (
            <div className="full-flex flex-row flex-center flex-column is-text-center flex-jsa tb-pad-30 homeSection AboutusSection">
                <div className="flex-column flex-center is-text-center flex-jsa content">
                    <div className="about heading">About Us</div>
                    <img src={icons.arrow} alt="not found" />
                    <div className="description">
                        We are a location-independent yoga centre.
                        We travel and create an ambient space for learning yoga - a yōgaśaāla - near you.
                        Join us on this journey exploring the limits of the mind and body.
                    </div>
                    <div className="description">
                        Are you keen on exploring the limits of your mind and body?
                        To dive deep and explore the limitless potential in yourself?
                        Come, join us on this journey!
                    </div>
                </div>
            </div>
        );
    }
}

AboutusSection.propTypes = {
    desktop_view: PropTypes.bool,
    icons: PropTypes.object
};
