import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default class Login extends Component {
    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            form_data: {
                email: "",
                password: "",
            }
        };
    }

    componentDidMount() {
        this.props.form.validateFields(); // To disabled submit button at the beginning.
    }

    handleInputChange = (event) => {
        if (event.target.name === "email") {
            this.setState({
                form_data: {
                    ...this.state.form_data,
                    email: event.target.value
                }
            });
        } else if (event.target.name === "password") {
            this.setState({
                form_data: {
                    ...this.state.form_data,
                    password: event.target.value
                }
            });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                this.props.actions.userLogin(this.state.form_data);
                this.props.handleCancel();
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const emailIdError = isFieldTouched('emailId') && getFieldError('emailId');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        return (
            <Row>
                <Col xs={{ span: 24 }} className="loginSignupContainer">
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
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
                        <FormItem className="animated zoomIn" validateStatus={passwordError ? "error" : ""} help={passwordError || ''} >
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
                        <FormItem>
                            <Button className={classNames("commonHeight full-width t-mrgn-20 font-18", { 'btn-fill-green': !hasErrors(getFieldsError()) })} htmlType="submit" disabled={hasErrors(getFieldsError())} >
                                Login
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}

Login.propTypes = {
    form: PropTypes.object,
    actions: PropTypes.object,
    handleCancel: PropTypes.func,
};
