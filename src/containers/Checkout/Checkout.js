import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';


import checkoutStyles from './Checkout.module.css';


class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        }
    }

    componentDidMount () {
        const queryIngredients = {};
        const query = new URLSearchParams(this.props.location.search);  
        for (let param of query.entries()) {
            queryIngredients[param[0]] = param[1];
        }
        this.setState({ingredients: queryIngredients});
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(`${this.props.match.url}/contact-data`);
    }

    render() {
        return (
            <div className={checkoutStyles.Checkout}>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
            </div>
        );
    }
}

export default Checkout;