// @flow
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';

type P = {};
class App extends Component<P> {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/envelope/:envelopeId" component={Home} />
      </React.Fragment>
    );
  }
}

export default App;
