import React  from 'react';

import inputStyles from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    const inputStylesArray = [inputStyles.InputElement]

    let hasInputError = false;
    if (!props.isValid && props.shouldValidate && props.isTouched) {
        inputStylesArray.push(inputStyles.Invalid);
        hasInputError = true;
    }
    switch (props.elementType) {
        case 'input':
            inputElement = <input 
                            className={inputStylesArray.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>
            break;
        case 'textarea':
            inputElement = <textarea 
                            className={inputStylesArray.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>
            break;
        case 'select':
            const selectOptions = props.elementConfig.options.map((option) => (
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            ));
            inputElement = <select 
                            className={inputStylesArray.join(' ')} 
                            value={props.value}
                            onChange={props.changed}>
                {selectOptions}
            </select>
            break;
        default:
            break;
    }

    let validationError = null;
    if (hasInputError) {
        validationError =  <p className={inputStyles.ValidationError}>Please enter a valid '{inputElement.props.placeholder}'</p>;
    }

    return (
        <div className={props.config}>
            <label className={inputStyles.InputLabel}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default Input;