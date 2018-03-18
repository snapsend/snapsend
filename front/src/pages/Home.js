// @flow
import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';
import PicIcon from 'material-ui-icons/CameraRoll';
import { Redirect } from 'react-router-dom';
import Dropzone, { handleDrop as uploadImages } from '../uploadImage';
import type { SuccessImage, UnfinishedEnvelope, Envelope } from '../types';
import Image from '../components/Image';
import { post } from '../network';

type PendingImage = Promise<SuccessImage>;

type P = {};

type State = {
  envelope?: UnfinishedEnvelope,
  pending: number,
  images: Array<SuccessImage>,
  redirect: ?string,
};

const initialEnvelope: UnfinishedEnvelope = {
  senderName: '',
  recipientName: '',
  createdDate: Date.now(),
  loading: false,
};

class Home extends Component<P, State> {
  state = {
    pending: 0,
    images: [],
    envelope: null,
    redirect: null,
  };

  handleDrop = acceptedFiles => {
    uploadImages(acceptedFiles).forEach((pending: PendingImage) => {
      this.setState(state => ({
        ...state,
        pending: state.pending + 1,
        envelope: state.envelope ? state.envelope : initialEnvelope,
      }));
      // now
      pending.then(img => {
        this.setState(state => ({
          ...state,
          pending: state.pending - 1,
          images: [...state.images, img],
        }));
      });
    });
  };

  handleEnvelopeChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(state => ({
      ...state,
      envelope: {
        ...state.envelope,
        [name]: value,
      },
    }));
  };

  handleEnvelopeSave = () => {
    const envelope = this.state.envelope;
    // set the state to envelope loading
    this.setState(state => ({
      ...state,
      envelope: {
        ...envelope,
        loading: true,
      },
    }));

    // post to the network
    post('/envelope', {
      ...envelope,
      images: this.state.images,
    }).then(res => {
      console.log('HIH', res);
      this.setState({ redirect: res.url });
    });

    // then reroute us to the newly created envelope.
  };

  render() {
    const { images, pending, envelope, redirect } = this.state;
    const yetToDrop = pending === 0 && images.length === 0;
    console.log('HOME', this.state);
    return (
      <Dropzone onDrop={this.handleDrop}>
        <Flex>
          <AppBar
            envelope={envelope}
            handleEnvelopeChange={this.handleEnvelopeChange}
            handleSave={this.handleEnvelopeSave}
          />
          {yetToDrop && (
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
          )}
          <Images>
            {images.map(img => <Image key={img.handle} img={img} />)}
            {[...new Array(pending)].map((v, i) => <Image key={i} />)}
          </Images>
        </Flex>
        {redirect && <Redirect />}
      </Dropzone>
    );
  }
}

export default Home;

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 30px;
  margin: 15px;
`;

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
