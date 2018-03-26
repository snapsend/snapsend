//@flow
import React, { Fragment } from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';
import { withTheme } from 'material-ui/styles';
import Button from './Button';
import Paper from 'material-ui/Paper';
import Logo from '../icons/Logo';
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
}: {
  envelope: ?Envelope | UnfinishedEnvelope,
  handleEnvelopeChange: EventHandler,
  handleSave: () => Promise<void>,
  isViewing: boolean,
  format: Format,
  size: Size,
  handleFormatChange: (SyntheticInputEvent<HTMLLIElement>) => void,
  handleSizeChange: EventHandler,
  downloadUrl: string,
  isAtEnvelope: boolean,
}) => {
  const isEnvelope = isAtEnvelope;
  return (
    <AppBar elevation={4} component="header" square>
      <Toolbar>
        <Logo style={{ marginRight: 20 }} />
        <Title variant="title">Snapsend.</Title>
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
          {isEnvelope && (
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
                Download
              </Button>
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
