import React from 'react';
import Login from './Login';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

/**
 * Login renders a button
 * Until that button is pressed
 * Then it renders a modal to login
 * And then if successful, and you're logged in
 * It renders a "logout".
 */

describe('Login Component', () => {
  // it('Login renders correctly', () => {
  //   const tree = renderer.create(<Login />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  it('Login renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
