//@flow
import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';
import { withTheme } from 'material-ui/styles';
import Button from './Button';
import Paper from 'material-ui/Paper';
import Logo from '../icons/Logo';
import type { UnfinishedEnvelope } from '../types';
import Input from 'material-ui/TextField';
import Login from './Login';

export default ({
  envelope,
  handleEnvelopeChange,
  handleSave,
  isViewing,
}: {
  envelope: ?UnfinishedEnvelope,
  handleEnvelopeChange: (SyntheticEvent<HTMLButtonElement>) => void,
  handleSave: () => Promise<void>,
  isViewing: boolean,
}) => {
  return (
    <AppBar elevation={4} component="header" square>
      <Toolbar>
        <Logo style={{ marginRight: 20 }} />
        <Title variant="title">Snapsend.</Title>
        <Login />
      </Toolbar>
      {envelope && (
        <EditingWrapper>
          <TextField
            autoFocus
            label="Your name"
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
            label="Recipient's name"
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
      )}
    </AppBar>
  );
};

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
