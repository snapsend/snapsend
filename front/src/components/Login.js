//@flow
import * as React from 'react';
import Button from './Button';
import Modal from './Modal';
import styled from 'styled-components';
import Card from 'material-ui/Card';
import T from './T';
import Logo from '../icons/Logo';
import Input from 'material-ui/TextField';
import { post } from '../network';
import Close from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';

type Status = 'LOGGED OUT' | 'LOGGED IN' | 'LOGGING IN' | 'SIGNING UP';
type Props = {};
type State = {
  email: string,
  password: string,
  password2: string,
  waiting: boolean,
  status: Status,
};

const initialState: State = {
  email: '',
  password: '',
  password2: '',
  waiting: false,
  status: 'LOGGED OUT',
};

export default class Login extends React.Component<Props, State> {
  state = initialState;

  handleClickLogin = () => {
    if (this.state.status === 'LOGGED IN')
      return this.setState({ status: 'LOGGED OUT' });

    return this.setState({ status: 'LOGGING IN' });
  };

  handleLogin = async () => {
    this.setState({ waiting: true });
    // now post
    const { email, password } = this.state;
    const res = await post('/login', { email, password });
    console.log('RES', res);
    if (res.success) {
      return this.setState({ waiting: false, status: 'LOGGED IN' });
    }
    this.setState({ waiting: false });
  };

  handleCreate = async () => {
    this.setState({ waiting: true });
    // now post
    const { email, password: password1, password2 } = this.state;
    const res = await post('/signup', { email, password1, password2 });
    console.log('RES', res);

    this.setState({ waiting: false });
  };

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState({ [name]: value });
  };

  handleClickCreate = () => this.setState({ status: 'SIGNING UP' });

  handleClose = () => this.setState({ status: 'LOGGED OUT' });

  render() {
    const { status, waiting } = this.state;

    if (status === 'LOGGING IN') {
      return (
        <Modal>
          <ModalWrap>
            <ModalInner>
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
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Input
                  name="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
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
                Or create a new account{' '}
              </T>
            </ModalInner>
          </ModalWrap>
        </Modal>
      );
    }
    if (status === 'SIGNING UP') {
      return (
        <Modal>
          <ModalWrap>
            <ModalInner>
              <CloseIcon onClick={this.handleClose}>
                <Close />
              </CloseIcon>
              <Header>
                <Logo style={{ height: 100, width: 100 }} />
                <Title variant="subheading">
                  Create your Snapsend account.
                </Title>
              </Header>
              <Form>
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <Input
                  name="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
                <Input
                  name="password2"
                  label="Confirm Password"
                  value={this.state.password2}
                  onChange={this.handleChange}
                  type="password"
                />
                <Button
                  disabled={waiting}
                  onClick={this.handleLogin}
                  variant="raised"
                  color="secondary"
                  style={{ margin: 15, alignSelf: 'flex-end' }}
                >
                  Create Account
                </Button>
              </Form>
            </ModalInner>
          </ModalWrap>
        </Modal>
      );
    }
    return (
      <Button onClick={this.handleClickLogin}>
        {status === 'LOGGED IN' ? 'Log out' : 'Log in'}
      </Button>
    );
  }
}

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

const ModalInner = styled(Card)`
  width: 90%;
  height: 90%;
  max-width: 700px;
  max-height: 450px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  position: relative;
`;

const ModalWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
