//@flow

import react from 'React';

export type SuccessImage = {
  filename: string,
  handle: string,
  mimetype: string,
  size: number,
  status: 'Stored',
  url: string,
};

export type UnfinishedEnvelope = {
  recipientName: string,
  senderName: string,
  loading: boolean,
  envelopeName: ?string,
};

export type Envelope = UnfinishedEnvelope & {
  handle: string,
  images: Array<SuccessImage>,
  createdAt: number,
};

export type Format = 'JPG' | 'PNG' | 'ORIGINAL';

export type Size = { width: ?number, height: ?number };

export type EventHandler = (SyntheticEvent<HTMLInputElement>) => void;
