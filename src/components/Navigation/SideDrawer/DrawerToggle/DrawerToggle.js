import React from 'react';

import DrawerToggleStyles from './DrawerToggle.module.css';

const drawerToggle = (props) => {
    return (
        <div className={DrawerToggleStyles.DrawerToggle} onClick={props.clicked}>
            <div />
            <div />
            <div />
        </div>
    );
}

export default drawerToggle;