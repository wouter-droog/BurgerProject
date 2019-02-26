import React, { Component } from "react";
import { connect } from 'react-redux';

import httpClient from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandling from '../../../hoc/withErrorHandling/withErrorHandling';
import * as orderActions from '../../../store/actions/orderAC';

import contactDataStyles from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Name'
          },
          value: '',
          validation: {
              required: true
          },
          isValid: false,
          isTouched: false
      },
      street: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Street'
          },
          value: '',
          validation: {
              required: true
          },
          isValid: false,
          isTouched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code'
        },
        value: '',
          validation: {
              required: true,
              minlength: 5
          },
          isValid: false,
          isTouched: false
    },
      country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Country'
        },
        value: '',
          validation: {
              required: true
          },
          isValid: false,
          isTouched: false
    },
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'E-mail'
        },
        value: '',
          validation: {
              required: true
          },
          isValid: false,
          isTouched: false
    },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest'}
            ]
        },
        value: 'fastest',
        validation: {},
        isValid: true
    }
    },
    isFormValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let key in this.state.orderForm) {
        formData[key] = this.state.orderForm[key].value
    }

    const order = {
      ingredients: this.props.ingrs,
      price: this.props.totalPrice,
      orderData: formData
    };
    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
        ...this.state.orderForm
    };

    const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.isTouched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let isFormValid = true;
    for (let key in updatedOrderForm) {
        isFormValid = updatedOrderForm[key].isValid && isFormValid;
    }

    this.setState({
        orderForm: updatedOrderForm,
        isFormValid: isFormValid
    })
  }

  checkValidity(value, rules) {
     let isValid = true;

     if (rules.required) {
         isValid = value.trim() !== '' && isValid;
     } 
     if (rules.minlength) {
         isValid = value.split(' ').join('').length >= rules.minlength && isValid;
     }
     return isValid;
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
            isValid={formElement.config.isValid}
            shouldValidate={formElement.config.validation}
            isTouched={formElement.config.isTouched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
    ))

    let form = (
      <form onSubmit={this.orderHandler}>
        {inputElements}
        <Button disabled={!this.state.isFormValid} btnType="Success">ORDER</Button>
      </form>
    );
    if (this.props.isLoading) {
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

const mapStateToProps = state => {
  return {
    ingrs: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isLoading: state.order.isLoading
  }
}

const matpDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
  }
}


export default connect(mapStateToProps, matpDispatchToProps)(withErrorHandling(ContactData, httpClient));
