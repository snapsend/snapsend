//@flow

import * as React from 'react';
import type { Envelope, Image as ImageType } from '../types';
import styled from 'styled-components';
import Image from './Image';
import T from './T';
import moment from 'moment';
import Button from './Button';
import Arrow from 'material-ui-icons/ArrowForward';
import { baseUrl } from '../utils';
import { Link } from 'react-router-dom';

/**
 * This component just displays the singular row
 * of an envelope sent or received
 * Along with some metadata
 */

type Props = {
  envelope: Envelope,
};

export default (props: Props) => {
  const { envelope } = props;
  let line = 'You sent ';
  if (envelope.status === 'R') line = 'You recieved ';
  let name = envelope.envelopeName;
  if (!name || name === '') name = 'Unnamed Envelope';
  line += name;

  line = 'Created by you ';
  if (envelope.status === 'R') line = 'Created by Anonymous ';
  return (
    <Wrap>
      <Header>
        <T variant="body2" style={{ lineHeight: 'inherit' }}>
          {name}
        </T>
        <Date variant="caption">
          {line}
          {moment.utc(envelope.createdAt).fromNow()}
        </Date>
        <div style={{ flex: 1 }} />
        <T
          variant="caption"
          style={{ marginRight: 30, textTransform: 'uppercase' }}
        >
          {envelope.images && envelope.images.length} images
        </T>
        <ViewAll
          size="small"
          component={Link}
          to={`/envelope/${envelope.handle}`}
        >
          View all <Arrow />
        </ViewAll>
      </Header>
      <Row>
        {envelope.images.map(im => <RowImage key={im.url} image={im} />)}
      </Row>
    </Wrap>
  );
};

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-flow: column;
  grid-gap: 30px;
  margin: 15px;
`;

const Wrap = styled.div`
  padding: 10px 0px;
  margin: 1px 0px;
  background: white;
  border-bottom: 1px solid #c2c2c2;
`;

const Header = styled.div`
  display: flex;
  margin: 0px 15px;
  align-items: baseline;
`;

const Date = styled(T)`
  font-style: italic;
  margin-left: 30px;
  padding: 7px;
`;

const ViewAll = styled(Button)``;

type ImProps = { image: ImageType };
const RowImage = props => {
  const { image } = props;
  return <Image img={image} />;
};
