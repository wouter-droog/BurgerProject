import React from 'react';

import modalStyles from './Modal.module.css';

const modal = (props) => (
    <div className={modalStyles.Modal}>
        {props.children}
    </div>
);

export default modal;