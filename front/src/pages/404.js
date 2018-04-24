//@flow
import * as React from 'react';
import styled from 'styled-components';
import T from '../components/T';
import AppBar from 'material-ui/AppBar';
import { MainAppBar } from '../components/AppBar';

export default () => {
  return (
    <Wrap>
      <Flex>
        <AppBar elevation={4} component="header" square>
          <MainAppBar />
        </AppBar>
        <Content>
          <T variant="display4">404</T>
          <T variant="display1">Page Not Found</T>
        </Content>
      </Flex>
    </Wrap>
  );
};

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Wrap = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: #c2c2c2;
  z-index: 0;
  padding: 30px;
`;
