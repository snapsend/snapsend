// @flow
import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';

type P = {};
class App extends Component<P> {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/envelope/:envelopeId" component={Home} />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
