import * as actionTypes from './action';
import EIngredient from '../enums/EIngredient';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    isPurchasable: false
};


const reducer = ( state = initialState, action ) => {
    const newState = Object.assign({}, state);
    const newIngredients = Object.assign({}, newState.ingredients);
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            newIngredients[action.ingredientName] = state.ingredients[action.ingredientName] + 1;
            newState.totalPrice = state.totalPrice + EIngredient.properties[EIngredient[action.ingredientName]].price;
            break;
        case actionTypes.REMOVE_INGREDIENT:
            newIngredients[action.ingredientName] = state.ingredients[action.ingredientName] - 1;
            newState.totalPrice = state.totalPrice - EIngredient.properties[EIngredient[action.ingredientName]].price;
            break;
        default:
            break;
    }

    newState.ingredients = newIngredients;

    // isPurchasable set after new ingredients are added
    const arr = Object.keys(newState.ingredients).map((key) => newState.ingredients[key]);
    const sumArray = arr.reduce((sum, el) => sum + el, 0);
    newState.isPurchasable = (sumArray > 0);

    return newState;
};


export default reducer;