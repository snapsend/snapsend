// @flow
import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { CookiesProvider } from 'react-cookie';
import LoginStatus from './components/LoginStatus';

import Home from './pages/Home';

type P = {};
class App extends Component<P> {
  render() {
    return (
      <ErrorBoundary>
        <CookiesProvider>
          <BrowserRouter>
            <LoginStatus>
              <Fragment>
                <Route exact path="/" component={Home} />
                <Route path="/envelope/:handle" component={Home} />
              </Fragment>
            </LoginStatus>
          </BrowserRouter>
        </CookiesProvider>
      </ErrorBoundary>
    );
  }
}

export default App;
