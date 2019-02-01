import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import modalStyles from './Modal.module.css';

const modal = (props) => (
    <>
        <Backdrop clicked={props.modalClosed} show={props.show} />
        <div className={modalStyles.Modal} style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
            {props.children}
        </div>
    </>
);

export default modal;