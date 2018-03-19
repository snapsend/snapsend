import React from 'react';
import T from './T';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

describe('T Component', () => {
  it('T renders correctly', () => {
    const tree = renderer.create(<T>Click me!</T>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('T renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<T>Click me!</T>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
