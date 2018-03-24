// @flow
import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './pages/Home';

type P = {};
class App extends Component<P> {
  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Fragment>
            <Route exact path="/" component={Home} />
            <Route path="/envelope/:envelopeId" component={Home} />
          </Fragment>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

export default App;
