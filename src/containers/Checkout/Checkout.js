import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';


import checkoutStyles from './Checkout.module.css';


class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    render() {
        return (
            <div className={checkoutStyles.Checkout}>
                <CheckoutSummary ingredients={this.state.ingredients} />

            </div>
        );
    }
}

export default Checkout;