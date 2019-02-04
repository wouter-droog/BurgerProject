import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';

import logoStyles from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={logoStyles.Logo}>
            <img src={burgerLogo} alt='burger logo' />
        </div>
    );
}

export default logo;