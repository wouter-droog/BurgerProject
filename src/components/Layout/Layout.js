import React from 'react';

import layoutStyles from './Layout.module.css';

const layout = (props) => (
    <>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <div className={layoutStyles.Content}>
            {props.children}
        </div>
    </>
);

export default layout;