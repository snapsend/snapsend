// @flow
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import type { Login, Logout, CreateUser, User } from '../types';
import { setToken } from '../cookies';
import { post, get } from '../network';

/**
 * This component will check the login status of the user based on the cookies
 *
 * If the user is logged in, it will pass that down the tree.
 *
 * It will also handle functions to log the user in
 */
type S = {
  token: ?string,
  error: ?string,
  login: Login,
  logout: Logout,
  createUser: CreateUser,
  waiting: boolean,
  user: ?User,
  refreshProfile: void => Promise<void>,
};

type P = {
  children: React.ComponentType<any>,
  cookies: any,
  history: any,
};

class LoginStatus extends React.Component<P, S> {
  constructor(props) {
    super(props);
    const token = props.cookies.get('token');
    this.state = {
      token,
      login: this.login,
      logout: this.logout,
      error: null,
      createUser: this.createUser,
      waiting: false,
      user: null,
      refreshProfile: this.getProfile,
    };
  }

  // check the login status on mount
  async componentDidMount() {
    // if you're logged in, get the user
    if (this.isLoggedIn()) {
      await this.getProfile();
    }
  }

  isLoggedIn = () => !!this.state.token;

  login: Login = async (email, password) => {
    // post to backend
    // set cookie
    // change token in state
    this.setState({ waiting: true });
    const res = await post('/login', { email, password });

    if (res.success && res.token) {
      setToken(res.token, this.props.cookies);
      this.setState({ token: res.token, waiting: false, error: null }, () =>
        this.getProfile()
      );
      return true;
    }
    this.setState({
      waiting: false,
      error: 'Login failed.',
      token: null,
      user: null,
    });
    return false;
  };

  getProfile = async () => {
    if (!this.state.token) return;
    const res = await get('/profile', this.state.token);
    if (res.success) {
      this.setState({ user: res });
    } else {
      this.props.cookies.remove('token');
      this.setState({ token: null, user: null, error: null });
    }
  };

  logout: Logout = async () => {
    // delete cookie
    this.props.cookies.remove('token');
    // post to backend
    // change state
    await post('/logout', { token: this.state.token });
    this.setState({ token: null, user: null, error: null });
    this.props.history.push('/');
  };

  createUser: CreateUser = async (
    email,
    password1,
    password2,
    profilepic,
    username
  ) => {
    this.setState({ waiting: true });
    // now post
    if (password1 !== password2)
      return Promise.reject('Passwords do not match');
    const res = await post('/signup', {
      email,
      password1,
      password2,
      profilepic,
      username,
    });
    if (res.success && res.token) {
      setToken(res.token, this.props.cookies);
      this.setState({ token: res.token, waiting: false, error: null }, () =>
        this.getProfile()
      );
      return true;
    }
    console.warn('FAILED SIGNUP', res);
    this.setState({
      waiting: false,
      error: res.error ? res.error : 'Signup failed.',
      user: null,
      token: null,
    });
    return false;
  };

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default withRouter(withCookies(LoginStatus));

const LoginContext = React.createContext();

// This function takes a component...
export function withLoginStatus(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  // ...and returns another component...
  return function LoginAwareComponent(props: any) {
    return (
      <LoginContext.Consumer>
        {ctx => <Component {...props} {...ctx} />}
      </LoginContext.Consumer>
    );
  };
}
