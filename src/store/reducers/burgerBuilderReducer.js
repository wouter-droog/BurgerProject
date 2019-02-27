import * as actionTypes from '../actions/actionTypes';
import EIngredient from '../../enums/EIngredient';
import { updateObject } from '../utility';

const START_PRICE = 4;
const ADD = 'ADD';
const REMOVE = 'REMOVE';

const initialState = {
    ingredients: null,
    totalPrice: START_PRICE,
    isPurchasable: false,
    hasError: false
};

const isBurgerPurchasable = (ingredients) => {
    const arr = Object.keys(ingredients).map((key) => ingredients[key]);
    const sumArray = arr.reduce((sum, el) => sum + el, 0);
    return (sumArray > 0);
}

const addIngredient = (state, action) => {
    return adjustIngredient(state, action, ADD);
}

const removeIngredient = (state, action) => {
    return adjustIngredient(state, action, REMOVE);
}

const adjustIngredient = (state, action, operation) => {
    const updatedIngredient = { [action.ingredientName]: operation === ADD ? state.ingredients[action.ingredientName] + 1 : state.ingredients[action.ingredientName] - 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedPrice = operation === ADD ? state.totalPrice + EIngredient.properties[EIngredient[action.ingredientName]].price 
        : state.totalPrice - EIngredient.properties[EIngredient[action.ingredientName]].price;
    const updatedProps = {
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        isPurchasable: isBurgerPurchasable(updatedIngredients)
    };
    return updateObject(state, updatedProps);
}


const setIngredients = (state, action) =>{
    const totalPrice = START_PRICE;
    const newIngredients = {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
    }
    const updatedProps = {
        ingredients: newIngredients,
        totalPrice: totalPrice
    }
    return updateObject(state, updatedProps);
}

const fetchIngredientsFailed = (state) => {
    const updatedProps = {
        hasError: true
    }
    return updateObject(state, updatedProps);
}


const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state);
        default:
            return state;
    }
};


export default reducer;