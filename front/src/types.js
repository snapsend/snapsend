//@flow

import react from 'React';

export type Image = {
  filename: string,
  url: string,
  status?: 'Stored',
  selected?: boolean,
};

export type NetworkResponse<T> =
  | { success: false, message?: string }
  | ({ success: true } & T);

export type UnfinishedEnvelope = {|
  loading?: boolean,
  envelopeName: ?string,
|};

export type Envelope = UnfinishedEnvelope & {
  handle: string,
  images: Array<Image>,
  createdAt?: string,
  success?: boolean,
  error?: string,
  history: any,
  status?: 'S' | 'R',
};

export type RecordedAction = {
  action: 'C' | 'V' | 'D',
  actiondate: string,
  dnum: ?number,
  username: ?string,
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
  profilepic: ?string,
  username: string
) => Promise<boolean>;

export type User = {
  username: ?string,
  email: string,
  envelope: Array<Envelope>,
  profilepic: ?string,
};
