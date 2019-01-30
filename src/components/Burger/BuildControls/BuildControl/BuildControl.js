import React from 'react';
import buildControlStyles from './BuildControl.module.css';

const BuildControl = (props) => (
    <div className={buildControlStyles.BuildControl}>
        <div className={buildControlStyles.Label}>{props.label}</div>
        <button className={buildControlStyles.Less}>Less</button>
        <button className={buildControlStyles.More}>More</button>
    </div>
);

export default BuildControl;