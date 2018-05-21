import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col, Form, Input, Button } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default class Signup extends Component {
    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            passwordValidationStatus: false,
            passwordErrorMsg: "",
            confirmPasswordValidationStatus: false,
            confirmPasswordErrorMsg: "",
            form_data: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                password_confirmation: ""
            }
        };
    }

    componentDidMount() {
        this.props.form.validateFields(); // To disabled submit button at the beginning.
    }

    handleInputChange = (event) => {
        if (event.target.name === "first_name") {
            this.setState({
                form_data: {
                    ...this.state.form_data,
                    first_name: event.target.value
                }
            });
        } else if (event.target.name === "last_name") {
            this.setState({
                form_data: {
                    ...this.state.form_data,
                    last_name: event.target.value
                }
            });
        } else if (event.target.name === "email") {
            this.setState({
                form_data: {
                    ...this.state.form_data,
                    email: event.target.value
                }
            });
        } else if (event.target.name === "password") {
            let password = event.target.value;
            this.setState({
                passwordValidationStatus: (password.length < 8),
                passwordErrorMsg: (password.length < 8) ? "password must have atleast 8 charaters" : "",
                form_data: {
                    ...this.state.form_data,
                    password,
                }
            });
        } else if (event.target.name === "confirm_password") {
            let value = event.target.value;
            this.setState({
                confirmPasswordValidationStatus: (value !== this.state.form_data.password),
                confirmPasswordErrorMsg: (value !== this.state.form_data.password) ? "password is not matching" : "",
                form_data: {
                    ...this.state.form_data,
                    password_confirmation: value
                }
            });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                this.props.actions.userSignup(this.state.form_data);
                this.props.handleCancel();
            }
        });
    };

    render() {
        let { passwordValidationStatus, passwordErrorMsg, confirmPasswordValidationStatus, confirmPasswordErrorMsg } = this.state;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const firstNameError = isFieldTouched('firstName') && getFieldError('firstName');
        // const lastNameError = isFieldTouched('lastName') && getFieldError('lastName');
        const emailIdError = isFieldTouched('emailId') && getFieldError('emailId');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const confirmPasswordError = isFieldTouched('confirmPassword') && getFieldError('confirmPassword');

        return (
            <Row>
                <Col xs={{ span: 24 }} className="loginSignupContainer">
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <FormItem className="animated zoomIn" validateStatus={firstNameError ? "error" : ""} help={firstNameError || ''} >
                            {
                                getFieldDecorator('firstName', {
                                    rules: [{ required: true, message: "please enter first name. " }],
                                })(
                                    <div className="flex-row flex-center inputContainer">
                                        <Input className="lr-pad-15 commonHeight rightBorder" placeholder="Enter your first name" name="first_name" value={this.state.form_data.first_name} onChange={this.handleInputChange} />
                                        <Input className="lr-pad-15 commonHeight" placeholder="Enter your last name" name="last_name" value={this.state.form_data.last_name} onChange={this.handleInputChange} />
                                    </div>
                                )
                            }
                        </FormItem>
                        {/* <FormItem className="animated zoomIn" validateStatus={lastNameError ? "error" : ""} help={lastNameError || ''} >
                            {
                                getFieldDecorator('lastName', {
                                    rules: [{ required: true, message: "please enter last name. " }],
                                })(
                                    <div className="flex-center inputContainer">
                                        <Input className="lr-pad-15 commonHeight" placeholder="Enter your last name" name="last_name" value={this.state.form_data.last_name} onChange={this.handleInputChange} />
                                    </div>
                                )
                            }
                        </FormItem> */}
                        <FormItem className="animated zoomIn" validateStatus={emailIdError ? "error" : ""} help={emailIdError || ''} >
                            {
                                getFieldDecorator('emailId', {
                                    rules: [{ required: true, message: "please enter  Email ID. " }, { type: "email", message: "Enter a valid Email ID" }],
                                })(
                                    <div className="flex-center inputContainer">
                                        <Input className="lr-pad-15 commonHeight" placeholder="Enter your email" name="email" value={this.state.form_data.email} onChange={this.handleInputChange} />
                                    </div>
                                )
                            }
                        </FormItem>
                        <FormItem className="animated zoomIn" validateStatus={(passwordError ? "error" : (passwordValidationStatus ? "warning" : ""))} help={(passwordError ? passwordError : (passwordValidationStatus ? passwordErrorMsg : ''))} >
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: "please enter password " }],
                                })(
                                    <div className=" flex-center inputContainer">
                                        <Input className="lr-pad-15 commonHeight" type="password" placeholder="Enter password" name="password" value={this.state.form_data.password} onChange={this.handleInputChange} />
                                    </div>
                                )
                            }
                        </FormItem>
                        <FormItem className="animated zoomIn" validateStatus={(confirmPasswordError ? "error" : (confirmPasswordValidationStatus ? "warning" : ""))} help={(confirmPasswordError ? confirmPasswordError : (confirmPasswordValidationStatus ? confirmPasswordErrorMsg : ''))} >
                            {
                                getFieldDecorator('confirmPassword', {
                                    rules: [{ required: true, message: "please confirm password " }],
                                })(
                                    <div className="flex-center inputContainer">
                                        <Input className="lr-pad-15 commonHeight" type="password" placeholder="confirm password" name="confirm_password" value={this.state.form_data.password_confirmation} onChange={this.handleInputChange} />
                                    </div>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button className={classNames("commonHeight full-width t-mrgn-20 font-18", { 'btn-fill-green': (!hasErrors(getFieldsError()) && !confirmPasswordValidationStatus && !passwordValidationStatus) })} htmlType="submit" disabled={(hasErrors(getFieldsError()) || confirmPasswordValidationStatus || passwordValidationStatus)} >
                                Signup
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}

Signup.propTypes = {
    form: PropTypes.object,
    actions: PropTypes.object,
    handleCancel: PropTypes.func,
};
