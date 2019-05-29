import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actionsIndex';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import httpClient from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling'

// master random comment + branch 1 comment
class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.isLoading) {
            orders = this.props.orders.map((order) => {
                return (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                )
            });
        }

        
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, httpClient));