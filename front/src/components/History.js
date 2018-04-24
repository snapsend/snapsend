//@flow
import * as React from 'react';
import type { User } from '../types';
import EnvelopeRow from './EnvelopeRow';
import styled from 'styled-components';
import T from './T';

/**
 * This component will take in the user information and
 *
 * Display the user history
 *
 * Display a drop point
 *
 * If there is no history, display a large drop point
 *
 * When something is being dragged, it will change the whole page into the drop point
 *
 * When some images are dropped, the history will disappear and it will just show the images.
 */

// const USER = {
//   email: 'kristo@kristo.com',
//   uname: 'kristo',
//   envelope: [
//     {
//       envelopeName: 'First envelope',
//       history: [],
//       handle: 'asdfaskhf',
//       recipientName: 'Bea Helman',
//       senderName: 'Kristo Jorgenson',
//       images: [
//         {
//           id: 1,
//           filename: 'file1',
//           url: 'https://cdn.filestackcontent.com/pKXAEMrcR9KEmRdjjjx7',
//         },
//         {
//           id: 2,
//           filename: 'file1',
//           url: 'https://cdn.filestackcontent.com/pKXAEMrcR9KEmRdjjjx7',
//         },
//         {
//           id: 3,
//           filename: 'file1',
//           url: 'https://cdn.filestackcontent.com/pKXAEMrcR9KEmRdjjjx7',
//         },
//         {
//           id: 4,
//           filename: 'file1',
//           url: 'https://cdn.filestackcontent.com/pKXAEMrcR9KEmRdjjjx7',
//         },
//         {
//           id: 5,
//           filename: 'file1',
//           url: 'https://cdn.filestackcontent.com/pKXAEMrcR9KEmRdjjjx7',
//         },
//       ],
//     },
//     {
//       envelopeName: 'Second envelope',
//       history: [],
//       handle: 'kadsfjqwo8ry3',
//       recipientName: 'Nicolini',
//       senderName: 'Kristo Jorgenson',
//       images: [
//         {
//           id: 1,
//           filename: 'file',
//           url: 'https://cdn.filestackcontent.com/pKXAEMrcR9KEmRdjjjx7',
//         },
//         {
//           id: 2,
//           filename: 'file',
//           url: 'https://cdn.filestackcontent.com/pKXAEMrcR9KEmRdjjjx7',
//         },
//         {
//           id: 3,
//           filename: 'file',
//           url: 'https://cdn.filestackcontent.com/pKXAEMrcR9KEmRdjjjx7',
//         },
//         {
//           id: 4,
//           filename: 'file',
//           url: 'https://cdn.filestackcontent.com/pKXAEMrcR9KEmRdjjjx7',
//         },
//         {
//           id: 5,
//           filename: 'file',
//           url: 'https://cdn.filestackcontent.com/pKXAEMrcR9KEmRdjjjx7',
//         },
//       ],
//     },
//   ],
// };

type Props = {
  user: ?User,
  show: boolean,
};

export default (props: Props) => {
  const { user, show } = props;
  if (!user || user.envelope.length < 1 || !show) return null;
  return (
    <Wrap>
      <T style={{ margin: 30 }} variant="headline">
        Envelope History
      </T>
      {user.envelope.map(env => (
        <EnvelopeRow envelope={env} key={env.handle} />
      ))}
    </Wrap>
  );
};

const Wrap = styled.section``;
