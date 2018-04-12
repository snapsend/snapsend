//@flow
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import LoginStatus from './components/LoginStatus';

export const Wrapper = ({
  children,
}: {
  children: React.ComponentType<any>,
}) => {
  return (
    <CookiesProvider>
      <LoginStatus>
        <BrowserRouter>{children}</BrowserRouter>
      </LoginStatus>
    </CookiesProvider>
  );
};
