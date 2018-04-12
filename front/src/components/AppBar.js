//@flow
import React, { Fragment } from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';
import { withTheme } from 'material-ui/styles';
import Button from './Button';
import Paper from 'material-ui/Paper';
import Logo from '../icons/Logo';
import { Link } from 'react-router-dom';
import T from './T';
import type {
  UnfinishedEnvelope,
  Format,
  Size,
  EventHandler,
  Envelope,
} from '../types';
import Input from 'material-ui/TextField';
import Login from './Login';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default ({
  envelope,
  handleEnvelopeChange,
  handleSave,
  isViewing,
  format,
  size,
  downloadUrl,
  handleFormatChange,
  handleSizeChange,
  isAtEnvelope,
  isRedirect,
  numSelected,
  deselectAll,
}: {
  envelope: ?UnfinishedEnvelope | Envelope,
  handleEnvelopeChange: EventHandler,
  handleSave: () => Promise<void>,
  isViewing: boolean,
  format: Format,
  size: Size,
  handleFormatChange: (SyntheticInputEvent<HTMLLIElement>) => void,
  handleSizeChange: EventHandler,
  downloadUrl: string,
  isAtEnvelope: boolean,
  isRedirect: boolean,
  numSelected: number,
  deselectAll: () => void,
}) => {
  const isEnvelope = isAtEnvelope;
  return (
    <AppBar elevation={4} component="header" square>
      <Toolbar>
        <Link
          to="/"
          style={{
            display: 'flex',
            textDecoration: 'none',
            alignItems: 'center',
          }}
        >
          <Logo style={{ marginRight: 20 }} />
          <Title variant="title">Snapsend.</Title>
        </Link>
        <div style={{ flex: 1 }} />
        <Login />
      </Toolbar>
      {envelope && (
        <Fragment>
          <EditingWrapper>
            <TextField
              autoFocus
              label="Sender"
              name="senderName"
              disabled={!!isViewing}
              value={envelope.senderName}
              onChange={handleEnvelopeChange}
            />
            <TextField
              name="recipientName"
              onChange={handleEnvelopeChange}
              autoFocus
              disabled={!!isViewing}
              label="Recipient"
              value={envelope.recipientName}
            />
            {!isViewing && (
              <Button
                onClick={handleSave}
                variant="raised"
                color="secondary"
                disabled={envelope.loading}
              >
                Get Link
              </Button>
            )}
          </EditingWrapper>
          {isRedirect && envelope && <CopyLink envelope={envelope} />}
          {isEnvelope &&
            !isRedirect && (
              <DownloadWrap>
                <FormControl style={{ minWidth: 86, margin: 20 }}>
                  <InputLabel>Format</InputLabel>
                  <Select
                    value={format}
                    onChange={handleFormatChange}
                    inputProps={{
                      name: 'format',
                    }}
                  >
                    <MenuItem value="ORIGINAL">
                      <em>Original</em>
                    </MenuItem>
                    <MenuItem value="JPG">jpg</MenuItem>
                    <MenuItem value="PNG">png</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  style={{ minWidth: 86, margin: 20 }}
                  label="Max width"
                  name="width"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Original"
                  value={size.width || ''}
                  onChange={handleSizeChange}
                />
                <TextField
                  style={{ minWidth: 86, margin: 20 }}
                  label="Max height"
                  name="height"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Original"
                  value={size.height || ''}
                  onChange={handleSizeChange}
                />
                <Button
                  style={{ minWidth: 86, margin: 20 }}
                  variant="raised"
                  color="secondary"
                  href={downloadUrl}
                  download={envelope.senderName || 'snapsend'}
                >
                  {`Download ${numSelected === 0 ? 'All' : numSelected}`}
                </Button>
                {numSelected > 0 && (
                  <Button
                    onClick={deselectAll}
                    size="small"
                    style={{ margin: 20 }}
                  >
                    Deselect all
                  </Button>
                )}
              </DownloadWrap>
            )}
        </Fragment>
      )}
    </AppBar>
  );
};

const DownloadWrap = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const TextField = styled(Input)`
  margin-right: 20px;
`;

const EditingWrapper = styled.div`
  display: flex;
  margin: 20px;
  align-items: flex-end;
`;

const Title = styled(Typography)`
  flex: 1;
`;

const AppBar = withTheme()(styled(Paper)`
  && {
    background-color: ${props => props.theme.palette.primary.main};
  }
`);
type P = {
  envelope: Envelope | UnfinishedEnvelope,
};
type S = {
  isCopied: boolean,
};
class CopyLink extends React.Component<P, S> {
  state = {
    isCopied: false,
  };

  handleCopy = () => this.setState({ isCopied: true });

  render() {
    const { envelope } = this.props;

    let url = 'https://snapsend.xyz/envelope/';
    if (envelope && typeof envelope.handle === 'string') {
      url = 'https://snapsend.xyz/envelope/' + envelope.handle;
    }
    return (
      <DownloadWrap style={{ alignItems: 'center' }}>
        <T style={{ margin: 20 }} variant="body1">
          Your link is:{' '}
        </T>
        <TextField style={{ flex: 1 }} value={url}>
          hi
        </TextField>
        <CopyToClipboard onCopy={this.handleCopy} text={url}>
          <Button
            style={{ minWidth: 86, margin: 20 }}
            variant="raised"
            color="secondary"
          >
            {this.state.isCopied ? 'Link Copied!' : 'Copy Link'}
          </Button>
        </CopyToClipboard>
      </DownloadWrap>
    );
  }
}
