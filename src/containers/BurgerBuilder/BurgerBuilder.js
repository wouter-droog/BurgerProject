import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4
    };

    addIngredientHandler = (type) => {
        const copyIngredients = { ...this.state.ingredients};
        copyIngredients[type] += 1;
        const NewTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: copyIngredients,
            totalPrice: NewTotalPrice
        })       
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const copyIngredients = {...this.state.ingredients};
            copyIngredients[type] -= 1;
            const NewTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({
                ingredients: copyIngredients,
                totalPrice: NewTotalPrice
            })
        }
    };

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0) ? true : false;       
        }

        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}/>
            </>
        )
    }
}


export default BurgerBuilder;

