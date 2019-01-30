import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import buildControlsStyles from './BuildControls.module.css';

const controls = [ 
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => {
    const buildControls = controls.map((ctrl) => (
        <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}/>
    ));

    return (
    <div className={buildControlsStyles.BuilControls}>
        {buildControls}
    </div>
    )
};

export default buildControls;