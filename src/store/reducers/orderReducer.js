import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    orders: [],
    isLoading: false,
    hasBeenPurchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };
    return updateObject(state, {
        isLoading: false,
        orders: state.orders.concat(newOrder),
        hasBeenPurchased: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { hasBeenPurchased: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { isLoading: true });
        case actionTypes.PURCHASE_BURGER_SUCCES:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { isLoading: false });
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { isLoading: true });
        case actionTypes.FETCH_ORDERS_SUCCES:
            return updateObject(state, { orders: action.orders, isLoading: false });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, { isLoading: false });
        default:
            return state;
    }
};


export default reducer;