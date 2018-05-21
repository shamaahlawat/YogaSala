import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, Modal, message } from 'antd';

const FormItem = Form.Item;
message.config({
    top: 100,
    duration: 1.5,
});

import * as pageActions from '../../data/redux/page_details/actions';
import * as orderActions from '../../data/redux/order_details/actions';
import * as eventActions from '../../data/redux/events_details/actions';
import * as CONSTANTS from '../../data/config/constants';
import { icons } from '../../data/assets/assetsurl';

import './index.scss';
import SpinnerLoader from '../../components/spinnerloader';
import PageHeader from '../../components/pageheader';

function mapStateToProps(state) {
    return {
        events_details: state.events_details,
        order_details: state.order_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, orderActions, pageActions, eventActions), dispatch)
    };
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class BookTickets extends Component {
    componentWillMount() {
        const { match, actions } = this.props;
        actions.pageChanged(CONSTANTS.appPages.BOOK_TICKETS, CONSTANTS.appPages.BOOK_TICKETS);
        actions.getEventDetails(match.params.event_id);
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    componentWillReceiveProps(nxtProps) {
        if (nxtProps.events_details && nxtProps.events_details !== this.props.events_details && !nxtProps.events_details.loaders.event_details_loading && nxtProps.events_details.current_event) {
            nxtProps.actions.updateTicketDetails(nxtProps.events_details.current_event.tickets);
        }
    }

    handleRedirect = () => {
        Modal.confirm({
            title: 'Are you sure you want to continue?',
            content: 'This will clear all the data you have entered!',
            okText: 'Yes, Im sure',
            cancelText: 'Don\'t leave',
            onOk: () => { this.props.history.push(`/events/${this.props.match.params.event_id}`); }
        });
    }

    handleInput = (event) => {
        this.props.form.validateFieldsAndScroll();
        this.props.actions.updateContactDetails('contact_details.' + event.target.name, event.target.value);
    };

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                this.createOrder();
            } else {
                message.error("Please enter/validate feilds!");
            }
        });
    };

    createOrder = () => {
        let { order_details } = this.props;
        let { contact_details } = this.props.order_details;
        let ordered_tickets = order_details.tickets.filter((ticket) => { return ticket.quantity > 0; });

        if (ordered_tickets.length === 0) {
            message.warning("Atleast one ticket has to be purchased!");
        } else {
            let order_payload = {
                name: contact_details.name,
                email: contact_details.email,
                number: contact_details.phone,
                order_items_attributes: []
            };

            ordered_tickets.map((ticket, index) => {
                order_payload.order_items_attributes[index] = Object.assign({}, { itemable_ticket: ticket.id, quantity: ticket.quantity });
            });

            this.props.actions.submitOrderDetails(order_payload);
        }
    };

    render() {
        const { events_details, order_details, actions } = this.props;
        if (events_details.loaders.event_details_loading) {
            return (
                <div className="full-height flex-row flex-center bg-default">
                    <SpinnerLoader text="Details loading" />
                </div>
            );
        } else if (events_details && events_details.current_event && events_details.current_event.id && events_details.current_event.tickets && events_details.current_event.tickets.length) {
            const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
            const userNameError = isFieldTouched('userName') && getFieldError('userName');
            const emailIdError = isFieldTouched('emailId') && getFieldError('emailId');
            const phoneNumberError = isFieldTouched('phoneNumber') && getFieldError('phoneNumber');
            const formItemLayout = {
                labelCol: { span: 24 },
                wrapperCol: { span: 24 }
            };

            return (
                <div className="flex-column t-pad-40 BookTicketsContainer background-color">
                    <PageHeader title="Book Tickets" image={icons.header_bg} />

                    <Col xs={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }} lg={{ span: 14, offset: 5 }} className="userDetails pad-20 tb-mrgn-30 flex-column">
                        <Col xs={24} className="eventsList flex-column">
                            {order_details.tickets.map((ticket, index) => {
                                return (
                                    <Col xs={{ span: 24 }} className="flex eventTicket b-mrgn-20 b-pad-10" key={index}>
                                        <Col xs={14} className="eventDetail">
                                            <p className="eventName b-mrgn-5">{ticket.title
                                            }</p>
                                            <p className="eventDate">{ticket.event_name}</p>
                                            <p className="eventDate">{ticket.date_string}</p>
                                        </Col>
                                        <Col xs={10} className="l-pad-20 flex-column flex-jsa eventPrice">
                                            <Col className="zindex-1 editTickets">
                                                <Col xs={24} className="flex flex-jsa noOfTickets">
                                                    <div className="circle decrement flex-row flex-center" onClick={() => { actions.updateTicketQuantity(CONSTANTS.ticketCounterTypes.DECREASE, index, actions.getTotalValue); }}>-</div>
                                                    <div>
                                                        {ticket.quantity}
                                                    </div>
                                                    <div className="circle increment flex-row flex-center" onClick={() => { actions.updateTicketQuantity(CONSTANTS.ticketCounterTypes.INCREASE, index, actions.getTotalValue); }}>+</div>
                                                </Col>
                                                <Col xs={24} className="t-mrgn-10 flex flex-center eventDate">₹ {ticket.price + ' x ' + ticket.quantity + ' = ₹ ' + ticket.price * ticket.quantity
                                                }
                                                </Col>
                                            </Col>
                                        </Col>
                                    </Col>
                                );
                            })}
                        </Col>

                        <Form className="full-flex flex-column flex-center checkoutForm">
                            <Col xs={24}>
                                <FormItem {...formItemLayout} label="Name" validateStatus={userNameError ? "error" : ""} help={userNameError || ''}>
                                    {getFieldDecorator('userName', {
                                        rules: [
                                            { whitespace: true, message: 'Please input your username!' },
                                            { required: true, message: 'Please input your username!' }
                                        ]
                                    })(
                                        <Input type="text" required name="name" className="form-control" placeholder="" setfieldsvalue={this.props.order_details.contact_details.name} onChange={this.handleInput} />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="Email ID" validateStatus={emailIdError ? "error" : ""} help={emailIdError || ''}>
                                    {getFieldDecorator('emailId', {
                                        rules: [
                                            { required: true, message: "Please enter your Email ID. " },
                                            { type: "email", message: "Enter a valid Email ID" }
                                        ]
                                    })(
                                        <Input type="email" required name="email" className="form-control" placeholder="" setfieldsvalue={this.props.order_details.contact_details.email} onChange={this.handleInput} />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="Phone Number" validateStatus={phoneNumberError ? "error" : ""} help={phoneNumberError || ''}>
                                    {getFieldDecorator('phoneNumber', {
                                        rules: [
                                            { required: true, message: 'Please input your phone number!' },
                                            { len: 10, message: "Enter a valid phone number" }
                                        ]
                                    })(
                                        <Input type="number" addonBefore="+91" required name="phone" className="form-control" placeholder="" setfieldsvalue={this.props.order_details.contact_details.phone} onChange={this.handleInput} />
                                    )}
                                </FormItem>
                            </Col>

                            <Col xs={24} className="total t-pad-10"><span className="span">Total: </span>₹ {order_details.total_value}/-</Col>

                            <Col xs={24} className="flex flex-jsb tb-pad-20">
                                <Button className="flex-row flex-center r-mrgn-20 lr-pad-30 tb-pad-5 is-cursor-ptr moreEvent" style={{ height: 'auto' }} onClick={() => { this.handleRedirect(); }}>CANCEL</Button>
                                <Button className="flex-row flex-center lr-pad-30 tb-pad-5 is-cursor-ptr button moreEvent continue" style={{ height: 'auto' }} onClick={this.submit} disabled={hasErrors(getFieldsError())}>MAKE PAYMENT</Button>
                            </Col>
                        </Form>
                    </Col>
                </div>
            );
        } else {
            return (
                <div className="flex-column t-pad-40 BookTicketsContainer">
                    <PageHeader title="Book Tickets" image={icons.header_bg} />
                    <div className="full-flex flex-row flex-center full-flex bg-default errorContainer">
                        <h3>Tickets are not available for this event now!!</h3>
                    </div>
                </div>
            );
        }
    }
}

BookTickets.propTypes = {
    actions: PropTypes.object,
    events_details: PropTypes.object,
    history: PropTypes.object,
    form: PropTypes.object,
    match: PropTypes.object,
    order_details: PropTypes.object
};

const CheckoutForm = Form.create()(BookTickets);
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
