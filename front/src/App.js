// @flow
import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';

type P = {};
class App extends Component<P> {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/envelope/:envelopeId" component={Home} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
