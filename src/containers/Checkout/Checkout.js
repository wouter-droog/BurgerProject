import React, { Component } from 'react';
import { Route} from 'react-router-dom';


import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import checkoutStyles from './Checkout.module.css';
import ContactData from './ContactData/ContactData';

const CONTACTDATA_PATH = '/contact-data';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 0
    }

    componentWillMount () {
        const queryIngredients = {};
        const query = new URLSearchParams(this.props.location.search);
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            }
            else {
                queryIngredients[param[0]] = param[1];
            }
        }
        this.setState({ingredients: queryIngredients, totalPrice: price});
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(`${this.props.match.url}${CONTACTDATA_PATH}`);
    }

    render() {
        return (
            <div className={checkoutStyles.Checkout}>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
                    <Route path={this.props.match.path + CONTACTDATA_PATH} render={(props) => (
                        <ContactData 
                            ingredients={this.state.ingredients} 
                            price={this.state.totalPrice}
                            {...props} />)}  />
            </div>
        );
    }
}

export default Checkout;