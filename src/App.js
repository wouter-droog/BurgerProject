import React, { Component } from 'react';
import Layout from './components/Layout/Layout';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>  
          <p>Hallo</p>
        </Layout>
      </div>
    );
  }
}

export default App;
