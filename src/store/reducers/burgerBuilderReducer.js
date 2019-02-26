import * as actionTypes from '../actions/actionTypes';
import EIngredient from '../../enums/EIngredient';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    isPurchasable: false,
    hasError: false
};


const reducer = ( state = initialState, action ) => {
    let newState = Object.assign({}, state);
    let newIngredients = Object.assign({}, newState.ingredients);
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            newIngredients[action.ingredientName] = state.ingredients[action.ingredientName] + 1;
            newState.totalPrice = state.totalPrice + EIngredient.properties[EIngredient[action.ingredientName]].price;
            break;
        case actionTypes.REMOVE_INGREDIENT:
            newIngredients[action.ingredientName] = state.ingredients[action.ingredientName] - 1;
            newState.totalPrice = state.totalPrice - EIngredient.properties[EIngredient[action.ingredientName]].price;
            break;
        case actionTypes.SET_INGREDIENTS:
            newState.totalPrice = 4;
            newIngredients = {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat
            }
            break;
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            newState.hasError = true;
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