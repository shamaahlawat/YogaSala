import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col, Modal, Form, Dropdown, Icon } from 'antd';

import * as pageActions from '../../data/redux/page_details/actions';
import * as userActions from '../../data/redux/user_details/actions';
import * as CONSTANTS from '../../data/config/constants';
import { icons } from '../../data/assets/assetsurl';

import './index.scss';
import Signup from './signup';
import Login from './login';
import SideNavbar from './sidenavbar';
import DropdownMenu from './dropdownmenu';

const SignupForm = Form.create()(Signup);
const LoginForm = Form.create()(Login);

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        user_details: state.user_details,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, userActions), dispatch)
    };
}

class AppHeader extends Component {
    constructor() {
        super();
        this.handleScroll = this.handleScroll.bind(this);
        this.fblogin = this.fblogin.bind(this);

        this.state = {
            current_page: 'home',
            yogasala_logo: icons.logo1,
            show: false,
            visible: false,
            current_login_form_type: CONSTANTS.currentLoginFormType.LOGIN,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nxtProps) {
        if (nxtProps.page_details.user_popup_requested && nxtProps.page_details.user_popup_requested !== this.props.page_details.user_popup_requested) {
            this.showUserModal();
        }
    }

    showUserModal = () => {
        this.setState({
            visible: true,
            current_login_form_type: CONSTANTS.currentLoginFormType.LOGIN,
        });
    };

    closeUserModal = () => {
        this.setState({
            visible: false
        });
        this.props.actions.closeLoginModal();
    };

    logoutUser = () => {
        this.props.actions.logoutUser();
        this.props.actions.closeLoginModal();
    };

    handleScroll() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            this.setState({
                yogasala_logo: icons.logo2
            });
        }

        else {
            this.setState({
                yogasala_logo: icons.logo1
            });
        }
    }

    loadPath = (path) => {
        this.props.history.push(path);
    };

    fblogin = () => {
        window.FB.login((response) => {
            this.props.actions.userFacebookCallback({ token: response.authResponse.accessToken }, () => {
                this.setState({
                    visible: false
                });
                this.props.actions.closeLoginModal();
            });
        }, { scope: 'public_profile,email' });
    };

    googleLogin = () => {
        window.gapi.auth.authorize({
            immediate: false,
            response_type: 'code',
            cookie_policy: 'single_host_origin',
            client_id: '365816726589-d7da99v1gi1vcps2uj81ibc23tgbqu53.apps.googleusercontent.com',
            scope: 'email profile'
        }, function(response) {
            if (response && !response.error) {
                // google authentication succeed, now post data to server.
                this.props.actions.userGoogleCallback({ token: response}, () => {
                    this.setState({
                        visible: false
                    });
                    this.props.actions.closeLoginModal();
                });

            } else {
                // google authentication failed
            }
        });
    };

    onMenuClicked = (key) => {
        if (key.toString() === "0") {
            this.loadPath('/user_documents');
        } else {
            this.logoutUser();
        }
    };

    render() {
        let { page_details, user_details, actions } = this.props;
        let { current_login_form_type } = this.state;

        let navItems = [
            { key: 1, title: 'HOME', page: CONSTANTS.appPages.HOME, path: '/home' },
            { key: 2, title: 'EVENTS', page: CONSTANTS.appPages.EVENTS, path: '/events' },
            { key: 3, title: 'SERVICES', page: CONSTANTS.appPages.SERVICES, path: '/services' },
            { key: 4, title: 'TESTIMONIALS', page: CONSTANTS.appPages.STUDENT_SPEAK, path: '/testimonials' },
            { key: 5, title: 'ABOUT US', page: CONSTANTS.appPages.ABOUT, path: '/about' },
            { key: 6, title: 'CONTACT US', page: CONSTANTS.appPages.CONTACT_US, path: '/contactUs' }
        ];

        const dropdown_menu = DropdownMenu(page_details.current_page, this.onMenuClicked);
        const sidebar_actions = {
            loadPath: this.loadPath,
            logoutUser: this.logoutUser,
            showUserModal: this.showUserModal
        };

        const isLoggedIn = !_.isEmpty(user_details.user);
        return (
            <Col xs={{ span: 24 }} className="appHeaderContainer lr-pad-15 bg-primary flex-row flex-jsb">
                <Col className="flex-row flex-jsb flex-ac is-cursor-ptr animated zoomIn" onScroll={this.handleScroll}>
                    <img className="animated zoomIn logo" src={this.state.yogasala_logo} alt="" onClick={() => { this.loadPath('/home'); }} />
                </Col>

                {page_details.device_data.screen_width <= 768 &&
                    <div className="sidenavbar">
                        <SideNavbar logged_in={isLoggedIn} page_details={page_details} nav_items={navItems} actions={sidebar_actions} />
                    </div>
                }

                {page_details.device_data.screen_width > 768 &&
                    <Col className="flex-row flex-jfe flex-ac flex-wrap linkContainer">
                        {navItems.map(navItem => {
                            return (
                                <div key={navItem.key} className={classNames("flex-row flex-center link", { "active": page_details.current_page === navItem.page })} onClick={() => this.loadPath(navItem.path)}>{navItem.title}
                                </div>
                            );
                        })}
                        {!isLoggedIn &&
                            <div className="flex-row flex-center link borderNone" onClick={() => { this.showUserModal(); }}>SIGN IN/UP</div>
                        }
                        {isLoggedIn &&
                            <Dropdown overlay={dropdown_menu} placement="bottomCenter" trigger={['click']} style={{ display: 'flex' }}>
                                <span className="ant-dropdown-link link flex-row flex-ac is-cursor-ptr">
                                    <span>{user_details.user.name.toUpperCase()}</span>
                                    <Icon style={{ fontSize: 10, marginTop: -5, paddingLeft: 5 }} type="caret-down" />
                                </span>
                            </Dropdown>
                        }
                    </Col>
                }

                <Modal title={null} visible={this.state.visible} onOk={this.closeUserModal} onCancel={this.closeUserModal} footer={null}>
                    <div className="flex-row flex-jsa">
                        <div className={classNames("l-mrgn-20 is-cursor-ptr loginSignup", { "yellowBorder": this.state.current_login_form_type === CONSTANTS.currentLoginFormType.LOGIN })} onClick={() => { this.setState({ current_login_form_type: CONSTANTS.currentLoginFormType.LOGIN }); }}>
                            Login
                        </div>
                        <div className={classNames("r-mrgn-20 is-cursor-ptr loginSignup", { "yellowBorder": this.state.current_login_form_type === CONSTANTS.currentLoginFormType.SIGNUP })} onClick={() => { this.setState({ current_login_form_type: CONSTANTS.currentLoginFormType.SIGNUP }); }}>
                            Signup
                        </div>
                    </div>
                    <div className="full-width lr-pad-20 t-pad-20">
                        {current_login_form_type === CONSTANTS.currentLoginFormType.SIGNUP &&
                            <SignupForm actions={actions} handleCancel={this.closeUserModal} />
                        }
                        {current_login_form_type === CONSTANTS.currentLoginFormType.LOGIN &&
                            <LoginForm actions={actions} handleCancel={this.closeUserModal} />
                        }
                    </div>
                    <div className="flex-row flex-center">
                        <div className="greyBorder" />
                        <div className="is-text-center or">Or</div>
                        <div className="greyBorder" />
                    </div>
                    <div className="loginBtn loginWithFacebook is-cursor-ptr tb-mrgn-10 flex-row flex-ac flex-jsa commonHeight" onClick={() => { this.fblogin(); }}>
                        <img src={icons.login_facebook} alt="" />
                        <div className="full-flex login">Continue with Facebook
                        </div>
                    </div>
                    <div className="loginBtn loginWithgoogle is-cursor-ptr mrgn-20 flex-row flex-ac flex-jsa commonHeight" onClick={() => { this.googleLogin(); }}>
                        <img src={icons.testimonial_instagram} alt="" />
                        <div className="full-flex login">Continue with Google</div>
                    </div>
                </Modal>
            </Col>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AppHeader);

AppHeader.propTypes = {
    history: PropTypes.object,
    page_details: PropTypes.object,
    user_details: PropTypes.object,
    actions: PropTypes.object
};
