import React from 'react';

import spinnerStyles from './Spinner.module.css';

const spinner = (props) => {
    return (
        <>
            <div className={spinnerStyles.Loader}>Bitte Warten Sie</div>
            <div style={{textAlign: 'center', fontWeight: 'bold'}}>Bitte Warten Sie</div>
        </>
    );
}

export default spinner;