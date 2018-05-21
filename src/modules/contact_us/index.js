import React, { Component } from 'react';
import { Col, Form, Input, Modal, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.scss';

import * as pageActions from '../../data/redux/page_details/actions';
import * as contactActions from '../../data/redux/contact_details/actions';
import * as CONSTANTS from '../../data/config/constants';
import { icons } from '../../data/assets/assetsurl';

import PageHeader from '../../components/pageheader';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function mapStateToProps(state) {
    return {
        contact_details: state.contact_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, contactActions, pageActions), dispatch)
    };
}

class ContactUs extends Component {
    constructor() {
        super();
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.CONTACT_US, CONSTANTS.appPages.CONTACT_US);
    }

    componentDidMount() {
        this.props.form.validateFields();
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nxtProps) {
        if (nxtProps.contact_details.loaders.success === true) {
            Modal.success({
                title: 'Contact Details',
                content: 'Contact Details Submitted',
                okText: 'Go to Home',
                onOk: () => { this.props.history.push('/home'); }
            });
        }
    }

    handleInput = (event) => {
        this.props.actions.updateContactDetails(event.target.name, event.target.value);
    };

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                this.props.actions.submitContactDetails(this.props.contact_details);
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const messageError = isFieldTouched('messageError') && getFieldError('messageError');
        const emailIdError = isFieldTouched('emailId') && getFieldError('emailId');
        const phoneNumberError = isFieldTouched('phoneNumber') && getFieldError('phoneNumber');

        return (
            <div className="full-flex flex-column contactContainer t-pad-40 background-color">
                <PageHeader title="Contact Us" image={icons.header_bg} />

                <Col xs={{ span: 24 }}>
                    <Col xs={{ span: 22, offset: 1 }} className="tb-pad-30">
                        <div className="b-pad-30 flex-column flex-center">
                            <div className="heading">
                                Yoga Classes - Experiential Workshops -Yoga Retreats
                                    </div>
                            <div style={{ marginTop: "-7px" }}>
                                <img src={icons.arrow} alt="not found" />
                            </div>
                        </div>
                        <Col xs={24}>
                            <Col md={{ span: 12 }} className="locationContainer">
                                <div className="map b-mrgn-30">
                                    <iframe frameBorder="0" border="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.378739641759!2d75.3644930502753!3d11.878694091538096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba43d3796f44a9b%3A0xf3d8d22f940df183!2sYogasala+Rd%2C+Talap%2C+Kannur%2C+Kerala!5e0!3m2!1sen!2sin!4v1515505236158" width="530" height="374" />
                                </div>
                                <div className="t-mrgn-20 b-mrgn-10 flex flex-ac">
                                    <div><img src={icons.placeholder} /></div>
                                    <div className="l-mrgn-10 textStyle">Yogasala, Road No. 41, Jubilee Hills, Hyderabad</div>
                                </div>
                                <div className="b-mrgn-10 flex flex-ac">
                                    <div><img src={icons.call} /></div>
                                    <div className="l-mrgn-10 textStyle">+91-9966900337</div>
                                </div>
                                <div className="b-mrgn-10 flex flex-ac">
                                    <div><img src={icons.mail} /></div>
                                    <div className="l-mrgn-10 textStyle">hari@yogasaala.org</div>
                                </div>
                            </Col>
                            <Col md={{ span: 12 }} className="contactForm">
                                <Col md={{ span: 22, offset: 1 }}>
                                    <Form>
                                        <FormItem label="Name" validateStatus={userNameError ? "error" : ""} help={userNameError || ''}>
                                            {
                                                getFieldDecorator('userName', {
                                                    rules: [{ required: true, message: 'Please input your username!' }],
                                                })(
                                                    <Input
                                                        type="text"
                                                        required
                                                        name="name"
                                                        className="form-control "
                                                        placeholder=""
                                                        setfieldsvalue={this.props.contact_details.name}
                                                        onChange={this.handleInput}
                                                    />
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="Email ID" validateStatus={emailIdError ? "error" : ""} help={emailIdError || ''} >
                                            {
                                                getFieldDecorator('emailId', {
                                                    rules: [{ required: true, message: "Please enter your Email ID. " }, { type: "email", message: "Enter a valid Email ID" }],
                                                })(
                                                    <Input
                                                        type="email"
                                                        required
                                                        name="email"
                                                        className="form-control "
                                                        placeholder=""
                                                        setfieldsvalue={this.props.contact_details.email}
                                                        onChange={this.handleInput}
                                                    />
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="Phone Number" validateStatus={phoneNumberError ? "error" : ""} help={phoneNumberError || ''}>
                                            {
                                                getFieldDecorator('phoneNumber', {
                                                    rules: [{ required: true, message: 'Please input your phone number!' }],
                                                })(
                                                    <Input
                                                        type="number"
                                                        required
                                                        name="phone"
                                                        className="form-control "
                                                        placeholder=""
                                                        setfieldsvalue={this.props.contact_details.phone}
                                                        onChange={this.handleInput} />
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="Message" validateStatus={messageError ? "error" : ""} help={messageError || ''}>
                                            {
                                                getFieldDecorator('messageError', {
                                                    rules: [{ required: true, message: 'Please enter your message' }],
                                                })(
                                                    <textarea
                                                        required
                                                        rows="4"
                                                        name="message"
                                                        className=""
                                                        placeholder=""
                                                        setfieldsvalue={this.props.contact_details.message}
                                                        onChange={this.handleInput} />
                                                )
                                            }
                                        </FormItem>
                                        <Col xs={24} className="t-pad-20 flex-row flex-center">
                                            <Button className="lr-pad-30 tb-pad-5 is-cursor-ptr button" style={{ height: 'auto' }} onClick={this.submit} disabled={hasErrors(getFieldsError())}>
                                                SUBMIT
                                            </Button>
                                        </Col>
                                    </Form>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>
                <Col xs={{ span: 24 }} className="flex-row flex-wrap flex-ac bookAppointment">
                    <Col xs={{ span: 24 }} md={{ span: 16 }}>
                        <div style={{ lineHeight: 1.1 }}>Looking for yoga instructor?</div>
                        <div className="answer">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 8 }} className="t-mrgn-20 flex flex-center">
                        <div className="flex flex-center button">BOOK APPOINTMENT</div>
                    </Col>
                </Col>
            </div>
        );
    }
}

ContactUs.propTypes = {
    form: PropTypes.object,
    page_details: PropTypes.object,
    contact_details: PropTypes.object,
    actions: PropTypes.object,
    nxtProps: PropTypes.object,
    history: PropTypes.object,
};

const ContactUsForm = Form.create()(ContactUs);
export default connect(mapStateToProps, mapDispatchToProps)(ContactUsForm);
