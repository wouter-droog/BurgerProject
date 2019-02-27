import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import httpClient from '../../axios-orders';
import * as actions from '../../store/actions/actionsIndex';


class BurgerBuilder extends Component {

    state = {
        isReadyToOrder: false
    };


    componentDidMount () {
        this.props.onInitIngredients();
    }

    startOrderHandler = () => {
        this.setState({
            isReadyToOrder: true
        })
    }

    stopOrderHandler = () => {
        this.setState({
            isReadyToOrder: false
        })
    }

    continueOrderHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: 'checkout'
        });
    }


    render () {
        const disabledInfo = {
            ...this.props.ingrs
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0) ? true : false;       
        }

        let orderSummary = <Spinner />
        let burgerAndControls = this.props.error ? <p>The page can't be loaded</p> : <Spinner />
        if (this.props.ingrs) {
            burgerAndControls = (
                <>
                    <Burger ingredients={this.props.ingrs}/>
                    <BuildControls 
                        add={this.props.onAddIngredient}
                        remove={this.props.onRemoveIngredient}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.props.isPurchasable}
                        startOrder={this.startOrderHandler}
                    />
                </>
            )

            orderSummary = (
                <OrderSummary 
                    orderCancel={this.stopOrderHandler} 
                    orderContinue={this.continueOrderHandler}
                    ingredients={this.props.ingrs}
                    price={this.props.totalPrice}>
                </OrderSummary>
            )
        }

        return (
            <>           
                <Modal 
                    show={this.state.isReadyToOrder}
                    modalClosed={this.stopOrderHandler}>
                    {orderSummary}
                </Modal>
                {burgerAndControls}
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingrs: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isPurchasable: state.burgerBuilder.isPurchasable,
        error: state.burgerBuilder.hasError
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingrName) => dispatch(actions.addIngredient(ingrName)),
        onRemoveIngredient: (ingrName) => dispatch(actions.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling( BurgerBuilder, httpClient ));

