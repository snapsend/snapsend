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
          <LoginStatus>
            <BrowserRouter>
              <Fragment>
                <Route exact path="/" component={Home} />
                <Route path="/envelope/:handle" component={Home} />
              </Fragment>
            </BrowserRouter>
          </LoginStatus>
        </CookiesProvider>
      </ErrorBoundary>
    );
  }
}

export default App;
