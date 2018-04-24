// @flow
import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';
import PicIcon from 'material-ui-icons/CameraRoll';
import { Redirect } from 'react-router-dom';
import Dropzone, { handleDrop as uploadImages } from '../uploadImage';
import type {
  Image as ImageType,
  UnfinishedEnvelope,
  Envelope,
  Format,
  Size,
  EventHandler,
  Login,
  Logout,
  User,
} from '../types';
import Image from '../components/Image';
import { post, get, track } from '../network';
import Modal from '../components/Modal';
import T from '../components/T';
import Button from '../components/Button';
import { withLoginStatus } from '../components/LoginStatus';
import History from '../components/History';
import Drawer from '../components/Drawer';
import downloadImages from '../zipDownload';

type PendingImage = Promise<ImageType>;
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
  user: ?User,
  refreshProfile: void => Promise<void>,
};

type State = {
  envelope: ?(UnfinishedEnvelope | Envelope),
  pending: number,
  images: Array<ImageType>,
  redirect: ?string,
  format: Format,
  size: Size,
  uploadError: ?string,
  historyOpen: boolean,
  downloadProgress: number,
  isDownloading: boolean,
};

const initialEnvelope: UnfinishedEnvelope = {
  loading: false,
  envelopeName: '',
};

// const wait = ms => new Promise(r => setTimeout(r, ms));

class Home extends Component<P, State> {
  state: State = {
    pending: 0,
    images: [],
    envelope: null,
    redirect: null,
    format: 'ORIGINAL',
    size: { width: null, height: null },
    uploadError: null,
    historyOpen: true,
    downloadProgress: 0,
    isDownloading: false,
  };

  async componentDidMount() {
    // if the component just mounted, check if there is an envelopeId and fetch it.
    const { match } = this.props;
    if (match && match.params && typeof match.params.handle !== 'undefined') {
      const envelope: Envelope = await get(`/envelope/${match.params.handle}`);
      match.params &&
        match.params.handle &&
        track('V', match.params.handle, this.props.token);
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
    const { match, location } = this.props;

    const isAtEnvelope = !!(match && match.params && match.params.handle);
    const isRedirect = !!(
      location &&
      location.state &&
      location.state.redirect
    );
    if (isAtEnvelope || isRedirect) return;

    const res = uploadImages(acceptedFiles, !!this.props.token);
    if (typeof res === 'string') {
      this.setState({ uploadError: res });
      return;
    }

    res.forEach(async (pending: PendingImage) => {
      this.setState(state => ({
        ...state,
        pending: state.pending + 1,
        envelope: state.envelope ? state.envelope : initialEnvelope,
      }));
      // now
      const img = await pending;
      this.setState(state => ({
        ...state,
        pending: state.pending - 1,
        images: [...state.images, img],
      }));
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
      senderName: '',
      recipientName: '',
      images: this.state.images,
      token: this.props.token || null,
    });

    // then set the reroute to the newly creaed envelope
    this.setState({ redirect: res.handle }, () => this.props.refreshProfile());
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

  toggleHistory = () =>
    this.setState(state => ({ historyOpen: !state.historyOpen }));

  deleteImage = (i: number) => {
    this.setState(state => {
      const images = [...state.images];
      images.splice(i, 1);
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

  trackDownload = () => {
    const params = this.props.match.params;
    if (!params) return;
    const handle = params.handle;
    if (typeof handle !== 'string') return;

    let number = this.howManySelected();
    if (number === 0) number = this.state.images.length;
    track('D', handle, this.props.token, number);
  };

  handleDownload = async () => {
    const { images, envelope, format, size } = this.state;
    // pass in the right images
    if (!envelope) return;
    this.setState({ isDownloading: true });
    let selected = images.filter(im => !!im.selected);
    let numSelected = selected.length;
    if (numSelected === 0) {
      selected = images;
      numSelected = images.length;
    }

    const handleProgress = (num: number) => {
      this.setState({ downloadProgress: num });
    };
    await downloadImages(
      selected,
      size.width,
      size.height,
      format,
      envelope.envelopeName || 'snapsend',
      handleProgress
    );
    this.trackDownload();
    this.setState({ isDownloading: false });
  };

  render() {
    const { match, location, token, login, logout, user } = this.props;
    const {
      images,
      pending,
      envelope,
      redirect,
      size,
      format,
      downloadProgress,
      isDownloading,
    } = this.state;
    const yetToDrop = pending === 0 && images.length === 0;
    const isViewing: boolean = !!(match && match.params && match.params.handle);

    const numSelected = this.howManySelected();
    const isAtEnvelope = !!(match && match.params && match.params.handle);
    const isRedirect = !!(
      location &&
      location.state &&
      location.state.redirect
    );
    const status = isRedirect
      ? 'REVIEWING'
      : isViewing
        ? 'DOWNLOADING'
        : 'EDITING';

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
            isRedirect={isRedirect}
            token={token}
            login={login}
            logout={logout}
            numSelected={numSelected}
            pending={pending}
            deselectAll={this.deselectAll}
            download={this.handleDownload}
            toggleHistory={this.toggleHistory}
            downloadProgress={downloadProgress}
            isDownloading={isDownloading}
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
          {(images.length > 0 || pending > 0) && (
            <Content>
              <Images>
                {images.map((img, i) => (
                  <Image
                    toggle={
                      isViewing && !isRedirect
                        ? () => this.toggleImage(i)
                        : undefined
                    }
                    delete={
                      !isViewing && !isRedirect
                        ? () => this.deleteImage(i)
                        : undefined
                    }
                    key={img.url}
                    img={img}
                    status={status}
                  />
                ))}
                {[...new Array(pending)].map((v, i) => <Image key={i} />)}
              </Images>
              {status === 'DOWNLOADING' &&
                envelope &&
                envelope.images && (
                  <Drawer open={this.state.historyOpen} envelope={envelope} />
                )}
            </Content>
          )}
          <History user={user} show={yetToDrop && !isViewing} />
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
  margin: 30px;
  flex: 1;
`;

const Zone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: #c2c2c2;
  z-index: 0;
  padding: 30px;
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

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: flex-start;
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
