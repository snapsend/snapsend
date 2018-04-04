import React from 'react';
import ProfileImage from './ProfileImage';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

/**
 * Button just does what button does
 * Only it does it w/ special style.
 */

describe('ProfileImage Component', () => {
  it('ProfileImage renders correctly', () => {
    const tree = renderer
      .create(<ProfileImage>Click me!</ProfileImage>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('ProfileImage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfileImage>Click me!</ProfileImage>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
