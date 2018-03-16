import React from 'react';
import Button from './Button';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

describe('Button Component', () => {
  it('Button renders correctly', () => {
    const tree = renderer.create(<Button>Click me!</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Button renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Click me!</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
