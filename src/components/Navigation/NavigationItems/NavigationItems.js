import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import navigationItemsStyles from './NavigationItems.module.css';


const navigationItems = (props) => {
    return (
        <ul className={navigationItemsStyles.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    );
}

export default navigationItems;