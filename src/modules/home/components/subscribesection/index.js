import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class SusbscribeSection extends Component {
    render() {
        const { desktop_view, icons } = this.props;
        
        return (
            <div className="full-flex flex-column flex-center homeSection SusbscribeSection">
                <div className={`flex-center content ${desktop_view ? 'flex-row': 'flex-column'}`}>
                    <div className="flex-row flex-center yogaImage">
                        <img src={icons.subscribe} />
                    </div>
                    <div className="pad-30 flex-column flex-center yogaUpdates">
                        <div className="b-pad-10 newsletter">
                            Subscribe to our Newsletter
                        </div>
                        <div className="b-pad-10 monthlyUpdates">
                            Receive Monthly updates of Yogasala events.
                            Upcoming event news and registration links/forms.
                            Articles on yoga and healthy living
                        </div>
                        <div className="flex-row flex-center inputBox">
                            <input type="email" required name="email" className="form-control" placeholder="Enter email id" value="" style={{ padding: '6px 20px', lineHeight: 1}} />
                            <div className="flex-column flex-jc flex-ac is-cursor-ptr button">
                                <img src={icons.right_arrow} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SusbscribeSection.propTypes = {
    desktop_view: PropTypes.bool,
    icons: PropTypes.object
};
