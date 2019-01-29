import React from 'react';

import layoutStyles from './Layout.module.css';

const layout = (props) => (
    <>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={layoutStyles.Content}>
            {props.children}
        </main>
    </>
);

export default layout;