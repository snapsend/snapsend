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

export type NetworkResponse<T> =
  | { success: false, message?: string }
  | ({ success: true } & T);

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
  success: boolean,
  error?: string,
};

export type Format = 'JPG' | 'PNG' | 'ORIGINAL';

export type Size = { width: ?number, height: ?number };

export type EventHandler = (SyntheticEvent<HTMLInputElement>) => void;

export type Login = (string, string) => Promise<boolean>;

export type Logout = void => Promise<void>;

export type CreateUser = (
  email: string,
  password1: string,
  password2: string,
  profile_url: ?string,
  username: string
) => Promise<boolean>;

export type User = {
  uname: ?string,
  email: string,
  envelope: Array<Env>,
  profilepic: ?string,
};
