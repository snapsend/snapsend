import React from 'react';
import shallow from 'enzyme';
import AppBar from './AppBar';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

describe('AppBar', () => {
  it('AppBar renders correctly', () => {
    const tree = renderer.create(<AppBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('AppBar renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppBar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
