import React  from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

import checkoutStyles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={checkoutStyles.CheckoutSummary}>
            <h1>Looks tasty, doesn't it?</h1>
            <div className={checkoutStyles.CheckoutSummaryBurgerContainer} >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked={props.checkoutCancel} btnType={'Danger'}>CANCEL</Button>
            <Button clicked={props.checkoutContinue} btnType={'Success'}>CONTINUE</Button>
        </div>
    )
};

export default checkoutSummary;