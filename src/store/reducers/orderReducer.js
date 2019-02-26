import * as actionTypes from '../actions/actionTypes';


const initialState = {
    orders: [],
    isLoading: false,
    hasBeenPurchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                hasBeenPurchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.PURCHASE_BURGER_SUCCES:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                isLoading: false,
                orders: state.orders.concat(newOrder),
                hasBeenPurchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
};


export default reducer;