
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
require('dotenv').config();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <MainRouter></MainRouter>
      </BrowserRouter>
      
    );
  }
}

export default App;