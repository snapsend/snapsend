// @flow
import React, { Component } from 'react';
import AppBar from './AppBar';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';
import PicIcon from 'material-ui-icons/CameraRoll';

type P = {};
class App extends Component<P> {
  render() {
    return (
      <Flex>
        <AppBar />
        <Zone>
          <Circle>
            <PicIcon
              style={{
                color: '#B0B0B0',
                height: 150,
                width: 150,
                margin: 20,
                transform: 'rotate(13deg)',
              }}
            />
            <Typography variant="title">Drop your images here.</Typography>
          </Circle>
        </Zone>
      </Flex>
    );
  }
}

export default App;

const Zone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Circle = styled.div`
  border-radius: 100%;
  background: #ededed;
  width: 40vw;
  height: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
