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
            label={ctrl.label}
            add={() => props.add(ctrl.type)}
            remove={() => props.remove(ctrl.type)}
            disabled={props.disabledInfo[ctrl.type]}/>
    ));
    
    return (
    <div className={buildControlsStyles.BuildControls}>
        {buildControls}
    </div>
    )
};

export default buildControls;