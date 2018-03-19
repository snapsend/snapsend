import React from 'react';
import Image from './Image';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

/**
 * The Image component will:
 *  - render an image within a square box when an image is provided
 *  - render a "pending" placeholder when no image is provided
 *  - render an error when an error state is provided
 */

const ImageFixture = {
  filename: 'IMG_6206.jpeg',
  handle: 'INF7unQm2jNjmirNnY6A',
  mimetype: 'image/jpeg',
  size: 370862,
  status: 'Stored',
  url: 'https://cdn.filestackcontent.com/INF7unQm2jNjmirNnY6A',
};

const ImageUploadFailed = {
  errror: 'Image upload failed',
};

const ImageWrongFormat = {
  errror: 'File provided was an incorrect format',
};

describe('Image Component', () => {
  xtest('Image renders correctly when an image is provided', () => {
    const tree = renderer.create(<Image img={ImageFixture} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Image renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Image img={ImageFixture} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Image renders correctly when pending', () => {
    const tree = renderer.create(<Image />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xtest('Image renders correctly when wrong format', () => {
    const tree = renderer.create(<Image />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xtest('Image renders correctly when upload fails', () => {
    const tree = renderer.create(<Image />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
