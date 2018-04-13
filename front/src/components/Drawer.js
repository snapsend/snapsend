//@flow
import * as React from 'react';
import Slide from 'material-ui/transitions/Slide';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import T from './T';
import type { Envelope, RecordedAction } from '../types';
import SeenIcon from 'material-ui-icons/Visibility';
import CreatedIcon from 'material-ui-icons/CallMade';
import DownloadIcon from 'material-ui-icons/CloudDownload';
import moment from 'moment';

const DRAWER_WIDTH = 280;

type Props = { open: boolean, envelope: Envelope };
type State = {};
export default class HistoryDrawer extends React.Component<Props, State> {
  render() {
    const open = true;
    const { envelope } = this.props;
    if (!envelope.history) return null;

    const history = envelope.history.sort((a, b) =>
      moment.utc(a.actiondate).isBefore(moment.utc(b.actiondate))
    );

    return (
      <Slide direction="left" in={open}>
        <Drawer elevation={0} square>
          <ListItem>
            <Head variant="title">Envelope History</Head>
          </ListItem>
          <Divider />
          <List>
            {envelope.history.map((h, i) => {
              const icon =
                h.action === 'C' ? (
                  <CreatedIcon />
                ) : h.action === 'D' ? (
                  <DownloadIcon />
                ) : (
                  <SeenIcon />
                );
              const user = h.username || 'Anonymous';
              const primary =
                h.action === 'C'
                  ? `Created by ${user}`
                  : h.action === 'D'
                    ? `${user} downloaded ${h.dnum} images`
                    : `Seen by ${user}`;

              return (
                <ListItem key={i}>
                  {icon}
                  <ListItemText
                    primary={primary}
                    secondary={moment.utc(h.actiondate).fromNow()}
                  />
                </ListItem>
              );
            })}
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
