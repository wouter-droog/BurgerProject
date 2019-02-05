import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import toolbarStyles from './Toolbar.module.css';

const toolbar = (props) => {
    return (
        <header className={toolbarStyles.Toolbar}>
            <DrawerToggle clicked={props.menuClicked} />
            <div className={toolbarStyles.Logo}>
                <Logo />
            </div>
            <nav className={toolbarStyles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar; 