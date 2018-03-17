import React from 'react';
import shallow from 'enzyme';
import AppBar from './AppBar';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

/** AppBar:
 *  - Renders normally most of the time
 *  - If an UnfinishedEnvelope is provided, it renders that and allows user to save it
 *  - If a finished envelope is provided, it renders that and allows user to copy the link.
 */

const unfinishedEnvelopeFixture = {
  recipientName: 'kristo',
  senderName: 'bea',
  createdAt: 100483,
};

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

  xtest('Unfinished envelope renders correctly', () => {
    const tree = renderer
      .create(<AppBar envelope={unfinishedEnvelopeFixture} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  xtest('When click save, it forwards to the parent component', () => {});

  xtest('When saving, it displays a loading indicator', () => {});
});
