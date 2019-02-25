import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import EIngredient from '../../../enums/EIngredient';

import buildControlsStyles from './BuildControls.module.css';

const controls = [ 
    { label: EIngredient.salad.charAt(0).toUpperCase() + EIngredient.salad.slice(1), type: EIngredient.salad },
    { label: EIngredient.bacon.charAt(0).toUpperCase() + EIngredient.bacon.slice(1), type: EIngredient.bacon },
    { label: EIngredient.cheese.charAt(0).toUpperCase() + EIngredient.cheese.slice(1), type: EIngredient.cheese },
    { label: EIngredient.meat.charAt(0).toUpperCase() + EIngredient.meat.slice(1), type: EIngredient.meat }
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