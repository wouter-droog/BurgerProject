import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import EIngredient from '../../../enums/EIngredient';

import buildControlsStyles from './BuildControls.module.css';

const controls = [ 
    { label: 'Salad', type: EIngredient.salad },
    { label: 'Bacon', type: EIngredient.bacon },
    { label: 'Cheese', type: EIngredient.cheese },
    { label: 'Meat', type: EIngredient.meat }
];

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
        <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>
        {buildControls}
        <button onClick={props.startOrder} disabled={!props.purchasable} className={buildControlsStyles.OrderButton}>Order now</button>
    </div>
    )
};

export default buildControls;