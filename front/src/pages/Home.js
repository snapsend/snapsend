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
import { post, get } from '../network';

type PendingImage = Promise<SuccessImage>;

type P = {
  match: {
    params?: {
      envelopeId?: string,
    },
  },
};

type State = {
  envelope: ?UnfinishedEnvelope,
  pending: number,
  images: Array<SuccessImage>,
  redirect: ?string,
};

const initialEnvelope: UnfinishedEnvelope = {
  senderName: '',
  recipientName: '',
  loading: false,
  envelopeName: '',
};

class Home extends Component<P, State> {
  state: State = {
    pending: 0,
    images: [],
    envelope: null,
    redirect: null,
  };

  async componentDidMount() {
    // if the component just mounted, check if there is an envelopeId and fetch it.
    const { match } = this.props;
    if (match && match.params && match.params.envelopeId) {
      const envelope: Envelope = await get(
        `/envelope/${match.params.envelopeId}`
      );
      const images = envelope.images;
      this.setState(state => ({
        ...state,
        envelope,
        images,
      }));
    }
  }

  handleDrop = (acceptedFiles: Array<File>) => {
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

  handleEnvelopeChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState(state => ({
      ...state,
      envelope: {
        ...state.envelope,
        [name]: value,
      },
    }));
  };

  handleEnvelopeSave = async () => {
    const envelope = this.state.envelope;
    // set the state to envelope loading
    this.setState(state => ({
      ...state,
      envelope: {
        ...envelope,
        loading: true,
      },
    }));

    // post to the networ
    const res: { envelopeID: string } = await post('/envelope', {
      ...envelope,
      images: this.state.images,
    });

    // then set the reroute to the newly created envelope
    this.setState({ redirect: res.envelopeID });
  };

  render() {
    const { match } = this.props;
    const { images, pending, envelope, redirect } = this.state;
    const yetToDrop = pending === 0 && images.length === 0;
    const isViewing: boolean = !!(
      match &&
      match.params &&
      match.params.envelopeId
    );

    console.log('STATE', this.state);
    return (
      <Dropzone onDrop={this.handleDrop}>
        <Flex>
          <AppBar
            envelope={envelope}
            handleEnvelopeChange={this.handleEnvelopeChange}
            handleSave={this.handleEnvelopeSave}
            isViewing={isViewing}
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
            {images.map(img => <Image key={img.url} img={img} />)}
            {[...new Array(pending)].map((v, i) => <Image key={i} />)}
          </Images>
        </Flex>
        {redirect && <Redirect to={`/envelope/${redirect}`} />}
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
