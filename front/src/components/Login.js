//@flow
import * as React from 'react';
import Button from './Button';
import Modal from './Modal';
import styled from 'styled-components';
import T from './T';
import Logo from '../icons/Logo';
import Input from 'material-ui/TextField';
import { post } from '../network';
import Close from 'material-ui-icons/Close';
import AccountCircle from 'material-ui-icons/AccountCircle';
import IconButton from 'material-ui/IconButton';
import ProfileImage from './ProfileImage';
import { setToken } from '../cookies';
import { withCookies } from 'react-cookie';
import Avatar from 'material-ui/Avatar';
import type { Login, Logout, CreateUser, User } from '../types';
import { withLoginStatus } from './LoginStatus';

/**
 * Logged out -> login button
 * Logged in -> Profile button
 * Logging in -> modal(login)
 * Signing up -> modal(signup)
 * Viewing profile -> modal(profile)
 */

type Status = 'CLOSED' | 'LOGGING IN' | 'SIGNING UP' | 'VIEWING PROFILE';
type Props = {
  cookies: any,
  login: Login,
  logout: Logout,
  token: ?string,
  createUser: CreateUser,
  waiting: boolean,
  user: User,
  error: ?string,
};

type State = {
  email: string,
  password: string,
  password2: string,
  status: Status,
  error: boolean,
  profilePic: ?string,
  username: string,
};

const initialState: State = {
  email: '',
  password: '',
  password2: '',
  status: 'CLOSED',
  error: false,
  profilePic: null,
  username: '',
};

class LoginComponent extends React.Component<Props, State> {
  state = initialState;

  isLoggedIn() {
    if (this.props.token) return true;
    return false;
  }

  handleClickLogin = async () => {
    if (this.isLoggedIn()) {
      return this.props.logout();
    }

    return this.setState({ status: 'LOGGING IN' });
  };

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState({ [name]: value });
  };

  handlePicChange = (url: string) => this.setState({ profilePic: url });

  handleClickCreate = () => this.setState({ status: 'SIGNING UP' });

  openProfile = () => this.setState({ status: 'VIEWING PROFILE' });

  handleClose = () => this.setState({ status: 'CLOSED' });

  handleCreate = async () => {
    const success = await this.props.createUser(
      this.state.email,
      this.state.password,
      this.state.password2,
      this.state.profilePic,
      this.state.username
    );
    if (success) {
      this.setState({ status: 'CLOSED' });
    }
  };

  handleLogin = async () => {
    const res = await this.props.login(this.state.email, this.state.password);
    if (res) this.setState({ status: 'CLOSED' });
  };

  handleLogout = async () => {
    const res = await this.props.logout();
    if (res) this.setState({ status: 'CLOSED' });
  };

  render() {
    const { status, error, password, password2 } = this.state;
    const {
      createUser,
      login,
      logout,
      token,
      waiting,
      user,
      error: netError,
    } = this.props;

    const passwordsMatch = password === password2;
    const isLoggedIn = !!token;

    if (status === 'LOGGING IN') {
      return (
        <Modal>
          <CloseIcon onClick={this.handleClose}>
            <Close />
          </CloseIcon>
          <Header>
            <Logo style={{ height: 100, width: 100 }} />
            <Title variant="subheading">Log in to Snapsend.</Title>
          </Header>
          <Form>
            <Input
              name="email"
              error={error}
              label="Email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Input
              name="password"
              label="Passwor"
              error={error}
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
            {netError && <ErrorMsg>{netError}</ErrorMsg>}
            <Button
              disabled={waiting}
              onClick={this.handleLogin}
              variant="raised"
              color="secondary"
              style={{ margin: 15, alignSelf: 'flex-end' }}
            >
              Login
            </Button>
          </Form>
          <T
            variant="body1"
            style={{
              opacity: 0.8,
              textAlign: 'center',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={this.handleClickCreate}
          >
            Or create a new account
          </T>
        </Modal>
      );
    } else if (status === 'SIGNING UP') {
      return (
        <Modal>
          <CloseIcon onClick={this.handleClose}>
            <Close />
          </CloseIcon>
          <Header>
            <Logo style={{ height: 100, width: 100 }} />
            <Title variant="subheading">Create your Snapsend account.</Title>
          </Header>
          <Form>
            <ProfileImage
              style={{ alignSelf: 'center', marginTop: 30 }}
              handlePicChange={this.handlePicChange}
              profilePic={this.state.profilePic}
            />
            <Input
              name="username"
              label="Name"
              type="text"
              error={error}
              value={this.state.username}
              onChange={this.handleChange}
            />
            <Input
              name="email"
              label="Email"
              type="email"
              error={error}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Input
              name="password"
              label="Password"
              error={error || !passwordsMatch}
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              helperText={passwordsMatch ? '' : 'passwords do not match'}
            />
            <Input
              name="password2"
              label="Confirm Password"
              error={error || !passwordsMatch}
              value={this.state.password2}
              onChange={this.handleChange}
              type="password"
              helperText={passwordsMatch ? '' : 'passwords do not match'}
            />
            {netError && <ErrorMsg>Account creation failed.</ErrorMsg>}
            <Button
              disabled={waiting}
              onClick={this.handleCreate}
              variant="raised"
              color="secondary"
              style={{ margin: 15, alignSelf: 'flex-end' }}
            >
              Create Account
            </Button>
          </Form>
        </Modal>
      );
    } else if (status === 'VIEWING PROFILE' && isLoggedIn) {
      return (
        <Modal>
          <CloseIcon onClick={this.handleClose}>
            <Close />
          </CloseIcon>
          <Form>
            <ProfileImage
              style={{ alignSelf: 'center', marginTop: 30 }}
              handlePicChange={this.handlePicChange}
              disabled
              profilePic={user.profilepic}
            />
            <Input
              name="username"
              label="Name"
              type="text"
              disabled
              value={user.uname || 'No username provided.'}
            />
            <Input
              name="email"
              label="Email"
              type="email"
              disabled
              value={user.email}
            />
            <Button
              onClick={this.handleLogout}
              variant="raised"
              color="secondary"
              style={{ margin: 15, alignSelf: 'flex-end' }}
            >
              Log out
            </Button>
          </Form>
        </Modal>
      );
    } else if (isLoggedIn) {
      // test if logged in.
      return (
        <ProfileButton
          url={(user && user.profilepic) || null}
          name={(user && user.uname) || null}
          onClick={this.openProfile}
        />
      );
    }
    return (
      <Button onClick={this.handleClickLogin}>
        {status === 'LOGGED IN' ? 'Log out' : 'Log in'}
      </Button>
    );
  }
}

const ErrorMsg = styled.div`
  color: ${({ theme }) => theme.error};
  text-align: center;
  margin: 15px;
`;

const CloseIcon = styled(IconButton)`
  position: absolute;
  padding: 15px;
  top: 0;
  right: 0;
  opacity: 0.5;
  cursor: pointer;
`;
const Form = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  max-width: 400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled(T)`
  flex: 1;
  text-align: center;
`;

export default withLoginStatus(withCookies(LoginComponent));

const ProfileButton = ({
  url,
  name,
  ...props
}: {
  url: ?string,
  name: ?string,
  props?: any,
}) => {
  return (
    <Button {...props}>
      <Avatar src={url} style={{ marginRight: 15, height: 30, width: 30 }}>
        {!url && <AccountCircle />}
      </Avatar>
      {name || 'Your Account'}
    </Button>
  );
};
