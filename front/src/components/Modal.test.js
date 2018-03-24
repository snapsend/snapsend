import React from 'react';
import Modal from './Modal';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

/**
 *  Modal renders a modal in the modal root
 *
 */

describe('Modal Component', () => {
  it('Modal renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Modal>Hello I am modal</Modal>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
