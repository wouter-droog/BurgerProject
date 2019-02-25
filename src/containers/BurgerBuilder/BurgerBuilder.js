import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import httpClient from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import * as burgerBuilderActions from '../../store/actions/actionsIndex';


class BurgerBuilder extends Component {

    state = {
        isReadyToOrder: false,
        isLoading: false,
        hasError: false
    };


    componentDidMount () {
        // httpClient.get("https://react-burger-builder-8f56e.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({hasError: true});
        //     });
    }

    startOrderHandler = () => {
        this.setState({
            isReadyToOrder: true
        })
    }

    stopOrderHandler = () => {
        this.setState({
            isReadyToOrder: false
        })
    }

    continueOrderHandler = () => {
        this.props.history.push({
            pathname: 'checkout'
        });
    }


    render () {
        const disabledInfo = {
            ...this.props.ingrs
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0) ? true : false;       
        }

        let orderSummary = <Spinner />
        let burgerAndControls = this.state.hasError ? <p>The page can't be loaded</p> : <Spinner />
        if (this.props.ingrs) {
            burgerAndControls = (
                <>
                    <Burger ingredients={this.props.ingrs}/>
                    <BuildControls 
                        add={this.props.onAddIngredient}
                        remove={this.props.onRemoveIngredient}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.props.isPurchasable}
                        startOrder={this.startOrderHandler}
                    />
                </>
            )

            orderSummary = (
                <OrderSummary 
                    orderCancel={this.stopOrderHandler} 
                    orderContinue={this.continueOrderHandler}
                    ingredients={this.props.ingrs}
                    price={this.props.totalPrice}>
                </OrderSummary>
            )
        }

        if (this.state.isLoading) {
            orderSummary = <Spinner />
        }
        
        return (
            <>           
                <Modal 
                    show={this.state.isReadyToOrder}
                    modalClosed={this.stopOrderHandler}>
                    {orderSummary}
                </Modal>
                {burgerAndControls}
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingrs: state.ingredients,
        totalPrice: state.totalPrice,
        isPurchasable: state.isPurchasable
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingrName) => dispatch(burgerBuilderActions.addIngredient(ingrName)),
        onRemoveIngredient: (ingrName) => dispatch(burgerBuilderActions.removeIngredient(ingrName))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling( BurgerBuilder, httpClient ));

