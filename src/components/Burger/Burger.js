import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import BurgerStyles from './Burger.module.css';


const burger = (props) => {

    let ingredients = [];  
    for (let ingredient of Object.keys(props.ingredients)) {
        for (let i = 0; i < props.ingredients[ingredient]; i++ ){
            ingredients.push(<BurgerIngredient key={ingredient + i} type={ingredient}/>);
        }
    }  

    if (ingredients.length === 0) {
        ingredients = <h2>Start adding ingredients</h2>
    }

    return (
        <div className={BurgerStyles.Burger}>
            <BurgerIngredient type={'bread-top'} />
            {ingredients}
            <BurgerIngredient type={'bread-bottom'} />
        </div>
    );
};


export default burger;