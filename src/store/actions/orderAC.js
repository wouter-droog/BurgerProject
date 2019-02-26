import * as actionTypes from './actionTypes';
import httpClient from '../../axios-orders';



export const purchaseBurgerSucces = (id, orderData)  => ({
    type: actionTypes.PURCHASE_BURGER_SUCCES,
    id: id,
    orderData: orderData
});

export const purchaseBurgerFail = (error)  => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        httpClient
        .post("/orders.json", orderData)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSucces(response.data, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    }
}