// @flow
import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';
import PicIcon from 'material-ui-icons/CameraRoll';
import { Redirect } from 'react-router-dom';
import Dropzone, { handleDrop as uploadImages } from '../uploadImage';
import type {
  SuccessImage,
  UnfinishedEnvelope,
  Envelope,
  Format,
  Size,
  EventHandler,
  Login,
  Logout,
} from '../types';
import Image from '../components/Image';
import { post, get } from '../network';
import Modal from '../components/Modal';
import T from '../components/T';
import Button from '../components/Button';
import { withLoginStatus } from '../components/LoginStatus';

type PendingImage = Promise<SuccessImage>;
type P = {
  match: {
    params?: {
      handle?: string,
    },
  },
  location: {
    state?: {
      redirect?: boolean,
    },
  },
  token: ?string,
  login: Login,
  logout: Logout,
};

type State = {
  envelope: ?UnfinishedEnvelope,
  pending: number,
  images: Array<SuccessImage>,
  redirect: ?string,
  format: Format,
  size: Size,
  uploadError: ?string,
};

const initialEnvelope: UnfinishedEnvelope = {
  senderName: '',
  recipientName: '',
  loading: false,
  envelopeName: '',
};

const generateDownloadUrl = (
  images: Array<SuccessImage>,
  envelope: ?UnfinishedEnvelope,
  format: Format,
  size: Size,
  noneSelected: boolean
) => {
  // start with the base url
  const baseUrl = 'https://process.filestackapi.com/';
  // then get all the images into an array string
  // let imagesString = images
  //   .map(im => {
  //     const split = im.url.split('/');
  //     const handle = split[split.length - 1];
  //     if (im.selected || noneSelected) return handle;
  //     return '';
  //   })
  //   .toString();

  let imagesString = images.reduce((currString, im, ind) => {
    const split = im.url.split('/');
    const handle = split[split.length - 1];
    if (im.selected || noneSelected) {
      if (currString.length > 0) return `${currString},${handle}`;
      return handle;
    }
    return currString;
  }, '');

  if (images.length > 1) imagesString = `[${imagesString}]`;

  let formatString = '';
  if (format === 'JPG') {
    formatString = 'output=format:jpg/';
  } else if (format === 'PNG') {
    formatString = 'output=format:png/';
  }

  let resize = '';
  if (size.width || size.height) {
    let w = '';
    let h = '';
    if (size.width) w = `width:${size.width}`;
    if (size.height) h = `height:${size.height}`;
    if (size.width && size.height) {
      w = `${w},`;
      h = `${h}/`;
    } else {
      w = `${w}/`;
    }

    resize = `resize=${w}${h}`;
  }
  const result = `${baseUrl}${resize}${formatString}zip/${imagesString}`;
  return result;
};

class Home extends Component<P, State> {
  state: State = {
    pending: 0,
    images: [],
    envelope: null,
    redirect: null,
    format: 'ORIGINAL',
    size: { width: null, height: null },
    uploadError: null,
  };

  async componentDidMount() {
    // if the component just mounted, check if there is an envelopeId and fetch it.
    const { match } = this.props;
    if (match && match.params && match.params.handle) {
      const envelope: Envelope = await get(`/envelope/${match.params.handle}`);
      if (envelope.success !== true) return;
      const images = envelope.images;
      this.setState(state => ({
        ...state,
        envelope,
        images,
      }));
    }
  }

  handleDrop = (acceptedFiles: Array<File>) => {
    const res = uploadImages(acceptedFiles, !!this.props.token);
    if (typeof res === 'string') {
      this.setState({ uploadError: res });
      return;
    }

    res.forEach((pending: PendingImage) => {
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

  handleEnvelopeChange: EventHandler = e => {
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
    // post to the network
    const res: { handle: string } = await post('/envelope', {
      ...envelope,
      images: this.state.images,
      token: this.props.token || null,
    });

    // then set the reroute to the newly creaed envelope
    this.setState({ redirect: res.handle });
  };

  handleSizeChange: EventHandler = e => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState(state => ({
      ...state,
      size: {
        ...state.size,
        [name]: value,
      },
    }));
  };

  handleFormatChange = (e: SyntheticInputEvent<HTMLLIElement>) => {
    const value = e.target.value;
    if (value !== 'JPG' && value !== 'PNG' && value !== 'ORIGINAL') return;

    this.setState(state => ({
      ...state,
      format: value,
    }));
  };

  closeModal = () => this.setState({ uploadError: null });

  toggleImage = (i: number) => {
    this.setState(state => {
      const images = [...state.images];
      images[i].selected = images[i].selected ? !images[i].selected : true;
      return {
        ...state,
        images,
      };
    });
  };

  howManySelected = () => {
    return this.state.images.reduce(
      (prev, curr, currI) => prev + (curr.selected ? 1 : 0),
      0
    );
  };

  deselectAll = () => {
    this.setState(state => {
      const images = [...state.images].map(im => ({ ...im, selected: false }));
      return {
        ...state,
        images,
      };
    });
  };

  render() {
    const { match, location, token, login, logout } = this.props;
    const { images, pending, envelope, redirect, size, format } = this.state;
    const yetToDrop = pending === 0 && images.length === 0;
    const isViewing: boolean = !!(match && match.params && match.params.handle);

    const numSelected = this.howManySelected();
    const downloadUrl = generateDownloadUrl(
      images,
      envelope,
      format,
      size,
      numSelected === 0
    );
    const isAtEnvelope = !!(match && match.params && match.params.handle);
    const isRedirect = !!(
      location &&
      location.state &&
      location.state.redirect
    );

    return (
      <Dropzone onDrop={this.handleDrop}>
        {this.state.uploadError && (
          <TooManyFiles closeModal={this.closeModal} />
        )}
        <Flex>
          <AppBar
            isAtEnvelope={isAtEnvelope}
            envelope={envelope}
            handleEnvelopeChange={this.handleEnvelopeChange}
            handleSave={this.handleEnvelopeSave}
            isViewing={isViewing}
            size={size}
            format={format}
            handleFormatChange={this.handleFormatChange}
            handleSizeChange={this.handleSizeChange}
            downloadUrl={downloadUrl}
            isRedirect={isRedirect}
            token={token}
            login={login}
            logout={logout}
            numSelected={numSelected}
            deselectAll={this.deselectAll}
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
            {images.map((img, i) => (
              <Image
                toggle={() => this.toggleImage(i)}
                key={img.url}
                img={img}
              />
            ))}
            {[...new Array(pending)].map((v, i) => <Image key={i} />)}
          </Images>
        </Flex>
        {redirect && (
          <Redirect
            to={{
              pathname: `/envelope/${redirect}`,
              state: { redirect: true },
            }}
            push
          />
        )}
      </Dropzone>
    );
  }
}

export default withLoginStatus(Home);

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

const TooManyFiles = ({ closeModal }) => (
  <Modal style={{ maxHeight: 370, alignItems: 'center' }}>
    <T style={{ textAlign: 'center' }} variant="display1">
      Too many files.
    </T>
    <T style={{ margin: 40 }}>
      Logged out users can only upload 40 images per envelope. Logged in users
      can upload up to 1000 images per envelope
    </T>
    <Button variant="raised" color="secondary" onClick={closeModal}>
      Got it
    </Button>
  </Modal>
);
