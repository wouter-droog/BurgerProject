import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import sideDrawerStyles from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let sideDrawerClasses = null;
    switch (props.show) {
        case true:
            sideDrawerClasses = [sideDrawerStyles.SideDrawer, sideDrawerStyles.Open].join(' ');
            break;
        case false:
        sideDrawerClasses = [sideDrawerStyles.SideDrawer, sideDrawerStyles.Close].join(' ');
            break;
        default:
            break;
    }
    return (
        <>
            <Backdrop clicked={props.clicked} show={props.show} />
            <div className={sideDrawerClasses}>
                <div className={sideDrawerStyles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}

export default sideDrawer;