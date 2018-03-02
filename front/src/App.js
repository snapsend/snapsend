// @flow
import React, { Component } from 'react';
import AppBar from './AppBar';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';
import PicIcon from 'material-ui-icons/CameraRoll';
import Dropzone from 'react-dropzone';
import uploadImage from './uploadImage';

type P = {};
class App extends Component<P> {
  render() {
    return (
      <Dropzone onDrop={uploadImage}>
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
      </Dropzone>
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
  width: 90vw;
  height: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 390px;
  max-width: 390px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
