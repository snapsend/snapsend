//@flow
import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';
import { withTheme } from 'material-ui/styles';
import Button from './Button';
import Paper from 'material-ui/Paper';
import Logo from 'material-ui-icons/CameraRoll';

export default () => {
  return (
    <AppBar elevation={4} component="header" square>
      <Toolbar>
        <Logo
          style={{ color: '#333333', marginRight: 20, height: 34, width: 34 }}
        />
        <Title variant="title">Snapsend.</Title>
        <Button>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

const Title = styled(Typography)`
  flex: 1;
`;

const AppBar = withTheme()(styled(Paper)`
  && {
    background-color: ${props => props.theme.palette.primary.main};
  }
`);
