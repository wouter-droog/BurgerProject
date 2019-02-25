import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import EIngredient from '../../enums/EIngredient';

import BurgerStyles from './Burger.module.css';


const burger = (props) => {
    let ingredients = [];  
    for (let ingredient in props.ingredients) {
        for (let i = 0; i < props.ingredients[ingredient]; i++ ){
            ingredients.push(<BurgerIngredient key={ingredient + i} type={ingredient}/>);
        }
    }  

    if (ingredients.length === 0) {
        ingredients = <h2>Start adding ingredients</h2>
    }


    return (
        <div className={BurgerStyles.Burger}>
            <BurgerIngredient type={EIngredient.breadTop} />
            {ingredients}
            <BurgerIngredient type={EIngredient.breadBottom} />
        </div>
    );
};


export default burger;