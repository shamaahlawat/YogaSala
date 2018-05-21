import React from 'react';
import classNames from 'classnames';
import { Menu } from 'antd';

import * as CONSTANTS from '../../../data/config/constants';

const DropdownMenu = (page, onMenuClicked) => {
    return (
        <div className="navbarDropdownMenuContainer">
            <Menu onClick={(e) => onMenuClicked(e.key)} selectable="true">
                <Menu.Item key="0">
                    <span className={classNames("link", { "active": page === CONSTANTS.appPages.USER_DOCUMENTS })}>MY Documents</span>
                </Menu.Item>
                <Menu.Item key="1">
                    <span className="font-14 link">Logout</span>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default DropdownMenu;
