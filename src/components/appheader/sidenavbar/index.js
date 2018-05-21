import React, { Component } from 'react';
import { slide as Sidebar } from 'react-burger-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'antd';

import './index.scss';
import * as CONSTANTS from '../../../data/config/constants';

export default class SideNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    loadPath = (navItem) => {
        this.props.actions.loadPath(navItem);

        this.setState({
            isOpen: false
        });
    }

    render() {
        const { page_details, logged_in, nav_items, actions } = this.props;
        return (
            <div className="sideNavbarContainer">
                <Sidebar right isOpen={this.state.isOpen} customBurgerIcon={
                    <span><Icon type="bars" /></span>
                }>
                    <div className="is-relative sideBarContent">
                        <ul className="menulist">
                            {nav_items.map(navItem => {
                                return (
                                    <div key={navItem.key} className={classNames("flex-row flex-center link is-cursor-ptr", { "active": page_details.current_page === navItem.page })} onClick={() => this.loadPath(navItem.path)}>{navItem.title}
                                    </div>
                                );
                            })}
                            {!logged_in &&
                                <div className="flex-row flex-center link" onClick={() => { actions.showUserModal(); }}>SIGN IN/UP
                                </div>
                            }
                            {logged_in &&
                                <div className={classNames("flex-row flex-center link borderNone", { "active": page_details.current_page === CONSTANTS.appPages.USER_DOCUMENTS })} onClick={() => { this.loadPath('/user_documents'); }}>USER DOCUMENTS
                                </div>
                            }
                            {logged_in &&
                                <div className="flex-row flex-center link borderNone" onClick={() => { actions.logoutUser(); }}>LOGOUT
                                </div>
                            }
                        </ul>
                    </div>
                </Sidebar>
            </div>
        );
    }
}

SideNavbar.propTypes = {
    logged_in: PropTypes.bool,
    page_details: PropTypes.object,
    nav_items: PropTypes.array,
    actions: PropTypes.object
};
