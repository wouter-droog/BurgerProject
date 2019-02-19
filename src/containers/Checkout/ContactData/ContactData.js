import React, { Component } from "react";

import httpClient from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import contactDataStyles from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Your Name'
          },
          value: ''
      },
      street: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Street'
          },
          value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code'
        },
        value: ''
    },
      country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Country'
        },
        value: ''
    },
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Email'
        },
        value: ''
    },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest'}
            ]
        },
        value: ''
    }
    },
    isLoading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({isLoading: true});
    const formData = {};
    for (let key in this.state.orderForm) {
        formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    httpClient
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          isLoading: false
        });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
        ...this.state.orderForm
    };

    const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({
        orderForm: updatedOrderForm
    })

  }

  render() {
    const formElementsArr = Object.keys(this.state.orderForm).map((key) => ({
        id: key,
        config: this.state.orderForm[key]
    }));

    const inputElements = formElementsArr.map(formElement => (
        <Input 
            key={formElement.id} 
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} 
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
    ))

    let form = (
      <form onSubmit={this.orderHandler}>
        {inputElements}
        <Button btnType="Success">ORDER</Button>
      </form>
    );
    if (this.state.isLoading) {
      form = <Spinner />;
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
