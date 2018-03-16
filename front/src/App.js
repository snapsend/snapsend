// @flow
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';

type P = {};
class App extends Component<P> {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;
