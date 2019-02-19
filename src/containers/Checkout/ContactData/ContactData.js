import React, { Component } from 'react';

import httpClient from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import contactDataStyles from './ContactData.module.css';


class ContactData extends Component {
    state = {  
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        isLoading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            isLoading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Wouter Droog',
                address: {
                    street: 'Testlaan',
                    zipCode: '3464AA',
                    country: 'Netherlands'
                },
                email: 'test@test.nl'
            },
            deliveryMethod: 'fastest'
        };
        httpClient.post('/orders.json', order)
            .then(response => {this.setState({
                isLoading: false});
                this.props.history.push('/');
            })
            .catch(error => {this.setState(
                {isLoading: false})
            });
    }

    render() {
        let form = (
            <form>
            <Input inputtype='input' name='name' placeholder='Your name'/>
            <Input inputtype='input' name='email' placeholder='Your email'/>
            <Input inputtype='input' name='street' placeholder='Street'/>
            <Input inputtype='input' name='postal' placeholder='Postal code'/>
            <Button clicked={this.orderHandler} btnType='Success'>ORDER</Button>
        </form>
        );
        if (this.state.isLoading) {
            form = <Spinner />
        }
        return (
            <div className={contactDataStyles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>         
        );
    }
}

export default ContactData;