// @flow
import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { CookiesProvider } from 'react-cookie';
import LoginStatus from './components/LoginStatus';
import NotFound from './pages/404.js';

import Home from './pages/Home';

type P = {};
class App extends Component<P> {
  render() {
    return (
      <ErrorBoundary>
        <CookiesProvider>
          <BrowserRouter>
            <ContextProvider />
          </BrowserRouter>
        </CookiesProvider>
      </ErrorBoundary>
    );
  }
}

const ContextProvider = () => (
  <LoginStatus>
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/envelope/:handle" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  </LoginStatus>
);

export default App;
