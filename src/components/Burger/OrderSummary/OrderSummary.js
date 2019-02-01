import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    
    const ingrAmountLst = Object.keys(props.ingredients).map((key) =>  
        (<li key={key}><span className={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>)
    )

    return (
        <>
            <h3>Your Order</h3>
            <p>A burger with the following ingredients:</p>
            <ul>
                {ingrAmountLst}
            </ul>
            <p>Conticue to Checkout?</p>
            <p><strong>The price: {props.price.toFixed(2)}$</strong></p>
            <Button clicked={props.orderCancel} btnType={'Danger'}>CANCEL</Button>
            <Button clicked={props.orderContinue} btnType={'Success'}>CONTINUE</Button>
        </>
    );
}

export default orderSummary;


