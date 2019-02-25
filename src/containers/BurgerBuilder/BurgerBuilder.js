import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import httpClient from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/actionsIndex';


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
        console.log('burgerBuilder', this.props.error, this.props.ingrs.bacon);
        let burgerAndControls = this.props.error ? <p>The page can't be loaded</p> : <Spinner />
        if (Object.keys(this.props.ingrs).length !== 0) {
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
        ingrs: state.ingredients,
        totalPrice: state.totalPrice,
        isPurchasable: state.isPurchasable,
        error: state.hasError
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingrName) => dispatch(burgerBuilderActions.addIngredient(ingrName)),
        onRemoveIngredient: (ingrName) => dispatch(burgerBuilderActions.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling( BurgerBuilder, httpClient ));

