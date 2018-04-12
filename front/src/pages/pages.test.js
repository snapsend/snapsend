import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import renderer from 'react-test-renderer';
import { Wrapper } from '../Wrapper';

describe('App Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Wrapper>
        <Home />
      </Wrapper>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
