import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Button, Icon, Upload, Select, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import './index.scss';
import { icons } from '../../../../data/assets/assetsurl';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class WriteTestimonial extends Component {
    constructor() {
        super();
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            form_value: {
                event: null,
                name: null,
                title: null,
                description: null,
                file: []
            }
        };
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSelect = (value) => {
        this.setState({
            form_value: {
                ...this.state.form_value,
                event: value
            }
        });
        this.props.form.validateFields();
    }

    handleInput = (event) => {
        this.setState({
            form_value: {
                ...this.state.form_value,
                [event.target.name]: event.target.value
            }
        });
        this.props.form.validateFields();
    };

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                this.props.actions.submitTestimonials(this.state.form_value);
            } else {
                message.error("Please enter/validate feilds!");
            }
        });
    };

    render() {
        const { form, animation, events, actions, loading } = this.props;
        const { form_value } = this.state;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
        const selectError = isFieldTouched('event') && getFieldError('event');
        const userNameError = isFieldTouched('name') && getFieldError('name');
        const titleError = isFieldTouched('title') && getFieldError('title');
        const descriptionError = isFieldTouched('description') && getFieldError('description');
        const formItemLayout = {
            labelCol: { span: 20, offset: 2 },
            wrapperCol: { span: 20, offset: 2 },
        };

        const upload_props = {
            action: '/',
            name: "logo",
            listType: "picture",
            accept: "image/*",
            onRemove: (file) => {
                this.setState(({ form_value }) => {
                    const index = form_value.file.indexOf(file);
                    const newFileList = form_value.file.slice();
                    newFileList.splice(index, 1);
                    return {
                        form_value: {
                            ...form_value,
                            file: newFileList
                        }
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState({
                    form_value: {
                        ...form_value,
                        file: [file]
                    }
                });
                return false;
            },
            fileList: form_value.file,
        };

        return (
            <div className={`flex-column bg-color writeTestimonial animated ${animation}`}>
                <div className="flex-column flex-center tb-mrgn-30">
                    <span className="heading b-mrg-10">Share your thoughts on Yoga Classes, Workshops, Yoga Retreats</span>
                    <img src={icons.arrow} alt="not found" />
                </div>
                <Col xs={{ span: 20, offset: 2 }} md={{ span: 12, offset: 6 }} className="flex-column formContainer">
                    <Form className="full-flex flex-column flex-center testimonialForm">
                        <FormItem {...formItemLayout} label="Testimonial for" hasFeedback validateStatus={selectError ? "error" : ""} help={selectError || ''} >
                            {getFieldDecorator('event', {
                                rules: [
                                    { required: true, message: 'Please select your event!' },
                                ],
                            })(
                                <Select placeholder="Event" onChange={this.handleSelect}>
                                    {events.map(event => {
                                        return (
                                            <Option key={event.id} value={event.id}>{event.name}</Option>
                                        );
                                    })}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Name" validateStatus={userNameError ? "error" : ""} help={userNameError || ''}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your username!' }]
                            })(
                                <Input type="text" required name="name" className="form-control" placeholder="" setfieldsvalue={form_value.name} onChange={this.handleInput} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Title" validateStatus={titleError ? "error" : ""} help={descriptionError || ''}>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input your title!' }]
                            })(
                                <Input type="text" required name="title" className="form-control" placeholder="" setfieldsvalue={form_value.title} onChange={this.handleInput} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Description" validateStatus={descriptionError ? "error" : ""} help={descriptionError || ''}>
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Please enter your message' }]
                            })(
                                <textarea required rows="4" name="description" className="textArea" placeholder="" etfieldsvalue={form_value.description} onChange={this.handleInput} />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Media(Optional)" >
                            <div className="flex-column uploadContainer">
                                <span className="t-mrgn-5 b-mrgn-10 helpText">*Your one media file should not be more than 5MB.</span>
                                <Upload {...upload_props}>
                                    <Button className="flex-row flex-center">
                                        <Icon type="upload" /> Upload Media
                                    </Button>
                                </Upload>
                            </div>
                        </FormItem>

                        <Col xs={24} className="b-pad-20 flex-row flex-center">
                            <Button className="flex-row flex-center r-mrgn-20 lr-pad-30 tb-pad-5 is-cursor-ptr" style={{ height: 'auto' }} onClick={() => { actions.changeView('list'); }}>CANCEL</Button>
                            <Button className="flex-row flex-center lr-pad-30 tb-pad-5 is-cursor-ptr button" style={{ height: 'auto' }} onClick={this.submit} disabled={hasErrors(getFieldsError()) || loading}>SUBMIT</Button>
                        </Col>
                    </Form>
                </Col>
            </div>
        );
    }
}

WriteTestimonial.propTypes = {
    events: PropTypes.array,
    loading: PropTypes.bool,
    actions: PropTypes.object,
    animation: PropTypes.string,
    form: PropTypes.object
};

const writeTestimonial = Form.create()(WriteTestimonial);
export default writeTestimonial;
