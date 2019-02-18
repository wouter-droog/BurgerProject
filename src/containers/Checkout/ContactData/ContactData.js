import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import contactDataStyles from './ContactData.module.css';


class ContactData extends Component {
    state = {  
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    render() {
        return (
            <div className={contactDataStyles.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input className={contactDataStyles.Input} type='text' name='name' placeholder='Your name'/>
                    <input className={contactDataStyles.Input} type='email' name='email' placeholder='Your email'/>
                    <input className={contactDataStyles.Input} type='text' name='street' placeholder='Street'/>
                    <input className={contactDataStyles.Input} type='text' name='postal' placeholder='Postal code'/>
                    <Button btnType='Success'>ORDER</Button>
                </form>
            </div>         
        );
    }
}

export default ContactData;