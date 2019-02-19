import React  from 'react';

import inputStyles from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    switch (props.inputtype) {
        case 'input':
            inputElement = <input className={inputStyles.InputElement} {...props} />
            break;
        case 'textarea':
            inputElement = <textarea className={inputStyles.InputElement} {...props} />
            break;
        default:
            break;
    }

    return (
        <div className={inputElement.Input}>
            <label className={inputStyles.InputLabel}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default Input;