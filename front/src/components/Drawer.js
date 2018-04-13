//@flow
import * as React from 'react';
import Slide from 'material-ui/transitions/Slide';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import T from './T';
import type { Envelope } from '../types';
import SeenIcon from 'material-ui-icons/Visibility';
import CreatedIcon from 'material-ui-icons/CallMade';

const DRAWER_WIDTH = 240;

type Props = { open: boolean, envelope: Envelope };
type State = {};
export default class HistoryDrawer extends React.Component<Props, State> {
  render() {
    const open = true;
    const { envelope } = this.props;
    console.log('ENV', envelope);
    if (!envelope.history) return null;
    return (
      <Slide direction="left" in={open}>
        <Drawer elevation={0} square>
          <ListItem>
            <Head variant="title">Envelope History</Head>
          </ListItem>
          <Divider />
          <List>
            <ListItem>
              <CreatedIcon />
              <ListItemText primary="Created" secondary="April 1, 2018" />
            </ListItem>
          </List>
        </Drawer>
      </Slide>
    );
  }
}

const Drawer = styled(Paper)`
  width: ${DRAWER_WIDTH}px;
  align-self: stretch;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
`;

const Head = styled(T)`
  font-style: normal;
  opacity: 0.8;
`;
