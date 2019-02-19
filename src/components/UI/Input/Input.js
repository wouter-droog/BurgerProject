import React  from 'react';

import inputStyles from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputStyles.InputElement} {...props.elementConfig} value={props.value}/>
            break;
        case 'textarea':
            inputElement = <textarea className={inputStyles.InputElement} {...props.elementConfig} value={props.value}/>
            break;
        default:
            break;
    }

    return (
        <div className={props.config}>
            <label className={inputStyles.InputLabel}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default Input;