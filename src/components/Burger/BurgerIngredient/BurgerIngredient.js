import  React from 'react';
import PropTypes from 'prop-types';

import burgerIngredientStyles from './BurgerIngredient.module.css';


const typeIngredients = ['bread-top', 'bread-bottom', 'cheese', 'meat', 'bacon', 'salad'];


const burgerIngredient = (props) => {

    let ingredient = null;

    switch (props.type) {
        case 'bread-bottom':
            ingredient = <div className={burgerIngredientStyles.BreadBottom}></div>;
            break;
        case 'bread-top':
            ingredient = (
                <div className={burgerIngredientStyles.BreadTop}>
                    <div className={burgerIngredientStyles.Seeds1}></div>
                    <div className={burgerIngredientStyles.Seeds2}></div>
                </div>
            );
            break;
        case 'meat':
            ingredient = <div className={burgerIngredientStyles.Meat}></div>;
            break;
        case 'cheese':
            ingredient = <div className={burgerIngredientStyles.Cheese}></div>;
            break;
        case 'salad':
            ingredient = <div className={burgerIngredientStyles.Salad}></div>;
            break;
        case 'bacon':
            ingredient = <div className={burgerIngredientStyles.Bacon}></div>;
            break;
        default:
            ingredient = null;
            break;
    }

    return ingredient;
}


burgerIngredient.propTypes = {
    type: PropTypes.oneOf(typeIngredients).isRequired
}

export default burgerIngredient;

