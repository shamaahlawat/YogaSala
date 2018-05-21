import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message } from 'antd';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as eventsActions from '../../data/redux/events_details/actions';
import * as testimonialsActions from '../../data/redux/testimonials_details/actions';
import { createTestimonials } from '../../data/config/api';
import { icons } from '../../data/assets/assetsurl';

import PageHeader from '../../components/pageheader';
import TestimonialList from './components/testimoniallist';
import WriteTestimonial from './components/writetestimonial';

function mapStateToProps(state) {
    return {
        testimonials_details: state.testimonials_details,
        events_details: state.events_details,
        page_details: state.page_details,
        user_details: state.user_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, testimonialsActions, eventsActions), dispatch)
    };
}

class Testimonials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'list',
            animation_class: 'zoomIn',
            posting_testimonial: false
        };
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.STUDENT_SPEAK, CONSTANTS.appPages.STUDENT_SPEAK);
        this.props.actions.getTestimonialsDetails();
        this.props.actions.getEvents();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    changeView = (mode) => {
        let user_exist = this.props.user_details.user && this.props.user_details.user.id;
        if (mode === 'write' && !user_exist) {
            this.props.actions.openLoginModal();
        } else {
            this.setState({
                animation_class: mode === 'write' ? 'zoomIn' : 'fadeOut'
            }, () => {
                window.scrollTo(0, 0);
                setTimeout(() => {
                    this.setState({
                        mode
                    });
                }, 1000);
            });
        }
    }

    submitTestimonials = (payload) => {
        const hide = message.loading('Posting your testimonial..', 0);
        this.setState({
            posting_testimonial: true
        });
        createTestimonials(payload, (err) => {
            setTimeout(hide, 0);
            if (err) {
                message.error("Posting failed. Please retry!");
            } else {
                message.success("Thanks for posting your testimonial.");
                this.changeView('list');
            }
            this.setState({
                posting_testimonial: false
            });

        });
    }

    render() {
        const { testimonials_details, events_details } = this.props;
        const { mode, animation_class, posting_testimonial } = this.state;
        const testimonialActions = {
            changeView: this.changeView,
            submitTestimonials: this.submitTestimonials
        };

        const events = events_details ? events_details.events : [];

        return (
            <div className="flex-column testimonialsContainer t-pad-50">
                <div className="t-mrgn-50">
                    <PageHeader title="Testimonials" image={icons.testimonial_header_bg} />
                </div>
                {mode === 'list' && testimonials_details && testimonials_details.testimonials.length > 0 &&
                    <TestimonialList testimonials={testimonials_details.testimonials} actions={testimonialActions} />
                }
                {mode === 'write' &&
                    <WriteTestimonial actions={testimonialActions} events={events} animation={animation_class} loading={posting_testimonial} />
                }
            </div>
        );
    }
}

Testimonials.propTypes = {
    page_details: PropTypes.object,
    user_details: PropTypes.object,
    events_details: PropTypes.object,
    testimonials_details: PropTypes.object,
    actions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Testimonials);
