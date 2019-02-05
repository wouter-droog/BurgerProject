import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';

import logoStyles from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={logoStyles.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt='burger logo' />
        </div>
    );
}

export default logo;