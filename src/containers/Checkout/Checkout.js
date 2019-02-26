import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import checkoutStyles from './Checkout.module.css';
import ContactData from './ContactData/ContactData';


const CONTACTDATA_PATH = '/contact-data';

class Checkout extends Component {


    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(`${this.props.match.url}${CONTACTDATA_PATH}`);
    }

    render() {
        let summary = <Redirect to='/' />
        if (Object.keys(this.props.ingrs).length !== 0) {
            const afterPurchasedRedirect = this.props.hasBeenPurchased ? <Redirect to='/' /> : null;
            summary = (
                <div className={checkoutStyles.Checkout}>
                {afterPurchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ingrs} 
                        checkoutCancel={this.checkoutCancelHandler}
                        checkoutContinue={this.checkoutContinueHandler}/>
                        <Route path={this.props.match.path + CONTACTDATA_PATH} component={ContactData}/>
                </div>
            )
        }

        return summary;
    }
}


const mapStateToProps = state => {
    return {
        ingrs: state.burgerBuilder.ingredients,
        hasBeenPurchased: state.order.hasBeenPurchased
    };
}


export default connect(mapStateToProps)(Checkout);

