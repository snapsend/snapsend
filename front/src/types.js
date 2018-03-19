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
  createdAt: number,
  loading: boolean,
  envelopeName: ?string,
}

export type Envelope = UnfinishedEnvelope && {
  envelopeId: number,
  images: Array<SuccessImage>,
}