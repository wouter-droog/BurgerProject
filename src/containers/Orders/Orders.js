import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import httpClient from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling'


class Orders extends Component {
    state = { 
        orders: [],
        isLoading: true
     }

    componentDidMount () {
        httpClient.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                this.setState({
                    isLoading: false,
                    orders: fetchedOrders
                })
            })
            .catch(err => {
                this.setState({ isLoading: false})
            });
    }
    render() {
        console.log(this.state.orders);
        let price = 0;
        let orders = this.state.orders.map((order) => {
            return (
                <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            )
        });
        
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandling(Orders, httpClient);