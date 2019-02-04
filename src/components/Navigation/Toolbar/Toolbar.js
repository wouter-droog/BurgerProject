import React from 'react';
import Logo from '../../Logo/Logo';

import toolbarStyles from './Toolbar.module.css';

const toolbar = (props) => {
    return (
        <header className={toolbarStyles.Toolbar}>
            <div>Menu</div>
            <Logo />
            <nav>
                ...
            </nav>
        </header>
    );
}

export default toolbar; 