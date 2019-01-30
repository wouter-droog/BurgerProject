import React from 'react';
import buildControlStyles from './BuildControl.module.css';

const BuildControl = (props) => (
    <div className={buildControlStyles.BuildControl}>
        <div className={buildControlStyles.Label}>{props.label}</div>
        <button disabled={props.disabled} onClick={props.remove} className={buildControlStyles.Less}>Less</button>
        <button onClick={props.add} className={buildControlStyles.More}>More</button>
    </div>
);

export default BuildControl;