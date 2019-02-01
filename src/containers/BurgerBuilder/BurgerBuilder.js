import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        isPurchasable: false,
        isReadyToOrder: false
    };

    addIngredientHandler = (type) => {
        const newIngredients = { ...this.state.ingredients};
        newIngredients[type] += 1;
        const NewTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: newIngredients,
            totalPrice: NewTotalPrice
        })     
        this.updatePurchableState(newIngredients);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const newIngredients = {...this.state.ingredients};
            newIngredients[type] -= 1;
            const NewTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({
                ingredients: newIngredients,
                totalPrice: NewTotalPrice
            })
            this.updatePurchableState(newIngredients);
        }
    };

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
        alert("you continue");
    }

    updatePurchableState = (ingredients) => {
        const arr = Object.keys(ingredients).map((key) => ingredients[key]);
        const sumArray = arr.reduce((sum, el) => sum + el, 0);
        const isPurchasable = (sumArray > 0);

        this.setState({
            isPurchasable: isPurchasable
        })
    }


    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0) ? true : false;       
        }
        
        return (
            <>
                <Modal 
                    show={this.state.isReadyToOrder}
                    modalClosed={this.stopOrderHandler}>
                    <OrderSummary 
                        orderCancel={this.stopOrderHandler} 
                        orderContinue={this.continueOrderHandler}
                        ingredients={this.state.ingredients}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.isPurchasable}
                    startOrder={this.startOrderHandler}
                />
            </>
        )
    }
}


export default BurgerBuilder;

