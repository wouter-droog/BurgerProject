import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import EIngredient from '../../enums/EIngredient';
import Spinner from '../../components/UI/Spinner/Spinner';

import httpClient from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        isPurchasable: false,
        isReadyToOrder: false,
        isLoading: false,
        hasError: false
    };


    componentDidMount () {
        httpClient.get("https://react-burger-builder-8f56e.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({hasError: true});
            });
    }

    addIngredientHandler = (type) => {
        const newIngredients = { ...this.state.ingredients};
        newIngredients[EIngredient[type]] += 1;
        const NewTotalPrice = this.state.totalPrice + EIngredient.properties[type].price;
        this.setState({
            ingredients: newIngredients,
            totalPrice: NewTotalPrice
        })     
        this.updatePurchableState(newIngredients);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const newIngredients = {...this.state.ingredients};
            newIngredients[type] -= 1;
            const NewTotalPrice = this.state.totalPrice - EIngredient.properties[type].price;
            this.setState({
                ingredients: newIngredients,
                totalPrice: NewTotalPrice
            })
            this.updatePurchableState(newIngredients);
        }
    };

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
        let ingredientParams = [];
        Object.keys(this.state.ingredients).forEach((ingredient) => {
            ingredientParams.push(`${encodeURIComponent(ingredient)}=${encodeURIComponent(this.state.ingredients[ingredient])}`);
        });
        this.props.history.push({
            pathname: 'checkout',
            search: ingredientParams.join('&')
        });
        // this.setState({
        //     isLoading: true
        // });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Wouter Droog',
        //         address: {
        //             street: 'Testlaan',
        //             zipCode: '3464AA',
        //             country: 'Netherlands'
        //         },
        //         email: 'test@test.nl'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // httpClient.post('/orders.json', order)
        //     .then(response => {this.setState({
        //         isLoading: false, 
        //         isReadyToOrder: false})
        //     })
        //     .catch(error => {this.setState(
        //         {isLoading: false,
        //         isReadyToOrder: false})
        //     });
    }

    updatePurchableState = (ingredients) => {
        const arr = Object.keys(ingredients).map((key) => ingredients[key]);
        const sumArray = arr.reduce((sum, el) => sum + el, 0);
        const isPurchasable = (sumArray > 0);

        this.setState({
            isPurchasable: isPurchasable
        })
    }


    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0) ? true : false;       
        }

        let orderSummary = <Spinner />
        let burgerAndControls = this.state.hasError ? <p>The page can't be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burgerAndControls = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.isPurchasable}
                        startOrder={this.startOrderHandler}
                    />
                </>
            )

            orderSummary = (
                <OrderSummary 
                    orderCancel={this.stopOrderHandler} 
                    orderContinue={this.continueOrderHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}>
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


export default withErrorHandling(BurgerBuilder, httpClient);

