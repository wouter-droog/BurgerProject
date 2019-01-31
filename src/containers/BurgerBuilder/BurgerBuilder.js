import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

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
        purchasable: false
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

    updatePurchableState = (ingredients) => {
        const arr = Object.keys(ingredients).map((key) => ingredients[key]);
        const sumArray = arr.reduce((sum, el) => sum + el, 0);
        const isPurchasable = (sumArray > 0);

        this.setState({
            purchasable: isPurchasable
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
                <Modal></Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </>
        )
    }
}


export default BurgerBuilder;

