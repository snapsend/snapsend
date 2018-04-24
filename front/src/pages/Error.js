//@flow
import * as React from 'react';
import styled from 'styled-components';
import T from '../components/T';
import AppBar from 'material-ui/AppBar';
import { MainAppBar } from '../components/AppBar';

export default () => {
  return (
    <AppBar elevation={4} component="header" square>
      <MainAppBar />
    </AppBar>
  );
};
