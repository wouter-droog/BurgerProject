import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import ContactData from './containers/Checkout/ContactData/ContactData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch> 
            <Route path='/checkout' component={Checkout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch> 
        </Layout>
      </div>
    );
  }
}

export default App;