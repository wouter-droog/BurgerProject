import React from 'react';

import backdropStyles from './Backdrop.module.css';

const backdrop = (props) => (
    props.show ? <div onClick={props.clicked} className={backdropStyles.Backdrop}></div> : null
);

export default backdrop;