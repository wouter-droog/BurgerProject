import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import layoutStyles from './Layout.module.css';

class Layout extends React.Component {
    state = {
        hasSideDrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({
            hasSideDrawer: false
        })
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                hasSideDrawer: !prevState.hasSideDrawer
            }
        })
    }

    render() {

        return <>
            <Toolbar menuClicked={this.toggleSideDrawerHandler} />
            <SideDrawer clicked={this.sideDrawerClosedHandler} show={this.state.hasSideDrawer}/>
            <main className={layoutStyles.Content}>
                {this.props.children}
            </main>
        </>;
    }
}

export default Layout;