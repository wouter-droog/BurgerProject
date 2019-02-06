import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import modalStyles from './Modal.module.css';

class modal extends React.Component {
    // This prevents updating the ordersummary when the modal is not shown
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {

        return <>
            <Backdrop clicked={this.props.modalClosed} show={this.props.show} />
            <div className={modalStyles.Modal} style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }}>
                {this.props.children}
            </div>
        </>;
    }
}

export default modal;