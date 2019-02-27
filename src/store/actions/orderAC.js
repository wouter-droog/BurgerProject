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
            dispatch(purchaseBurgerSucces(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCES,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};


export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        httpClient.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrdersFail());
        });
    }
}