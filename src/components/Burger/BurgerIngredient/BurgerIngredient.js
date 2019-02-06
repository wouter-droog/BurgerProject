import  React from 'react';
import PropTypes from 'prop-types';
import EIngredient from '../../../enums/EIngredient';

import burgerIngredientStyles from './BurgerIngredient.module.css';


const burgerIngredient = (props) => {

    let ingredient = null;

    switch (props.type) {
        case EIngredient.breadBottom:
            ingredient = <div className={burgerIngredientStyles.BreadBottom}></div>;
            break;
        case EIngredient.breadTop:
            ingredient = (
                <div className={burgerIngredientStyles.BreadTop}>
                    <div className={burgerIngredientStyles.Seeds1}></div>
                    <div className={burgerIngredientStyles.Seeds2}></div>
                </div>
            );
            break;
        case EIngredient.meat:
            ingredient = <div className={burgerIngredientStyles.Meat}></div>;
            break;
        case EIngredient.cheese:
            ingredient = <div className={burgerIngredientStyles.Cheese}></div>;
            break;
        case EIngredient.salad:
            ingredient = <div className={burgerIngredientStyles.Salad}></div>;
            break;
        case EIngredient.bacon:
            ingredient = <div className={burgerIngredientStyles.Bacon}></div>;
            break;
        default:
            ingredient = null;
            break;
    }

    return ingredient;
}


burgerIngredient.propTypes = {
    type: PropTypes.oneOf(Object.values(EIngredient)).isRequired
}

export default burgerIngredient;

