import React from 'react';
import { NavLink } from 'react-router-dom';

import navigationItemStyles from './NavigationItem.module.css';


const navigationItem = (props) => {
    return (
        <li className={navigationItemStyles.NavigationItem}>
            <NavLink 
                to={props.link}
                exact
                activeClassName={navigationItemStyles.active}
            >{props.children}</NavLink>
        </li>
    );
}

export default navigationItem;