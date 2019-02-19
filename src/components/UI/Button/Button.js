import React from 'react';

import BtnStyles from './Button.module.css';

const button = (props) => {
    return (
        <button disabled={props.disabled} className={[BtnStyles.Button, BtnStyles[props.btnType]].join(' ')} onClick={props.clicked}>
            {props.children}
        </button>
    )
};

export default button;