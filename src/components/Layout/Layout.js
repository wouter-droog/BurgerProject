import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import layoutStyles from './Layout.module.css';

const layout = (props) => (
    <>
        <Toolbar />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={layoutStyles.Content}>
            {props.children}
        </main>
    </>
);

export default layout;