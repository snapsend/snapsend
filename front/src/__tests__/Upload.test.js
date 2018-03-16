jest.mock('filestack-js');
import filestack, { upload } from 'filestack-js';
import dropImages, { uploadImage, ACCEPTED_TYPES } from '../uploadImage';

import {
  successResult,
  errorResult,
  rejectWithError,
} from '../../__mocks__/filestack-js';

const TEST_IMAGE = {
  name: 'test.jpg',
  type: 'image/jpeg',
  size: 370862,
  preview: 'blob:http://localhost:3000/cdb02942-c2ad-4e75-b9e1-37762131ff16',
};

const GIF = {
  name: 'gif.gif',
  type: 'image/gif',
  size: 370862,
  preview: 'blob:http://localhost:3000/cdb02942-c2ad-4e75-b9e1-37762131ff16',
};

const FILE_NOT_IMAGE = {
  name: 'notAnImageFile.rtf',
  type: 'text/rtf',
  size: 370,
  preview: 'blob:http://localhost:3000/b7e2a53d-def4-4215-a0a4-ef44153864ce',
};

describe('upload to filestack', () => {
  test('if upload succeeds, it should return the image payload', () => {
    return expect(uploadImage(TEST_IMAGE)).resolves.toEqual(successResult);
  });

  test('When upload fails, it returns the right error', () => {
    expect.assertions(1);
    upload.mockImplementationOnce(() => rejectWithError('Image Upload Failed'));

    return expect(uploadImage(TEST_IMAGE)).rejects.toMatchSnapshot();
  });

  test('When input is not a file, it returns the right error', () => {
    expect.assertions(1);
    return expect(uploadImage(FILE_NOT_IMAGE)).rejects.toMatchSnapshot();
  });

  // are there any formats we do not accept
  test('When image is wrong format, it returns the right error', () => {
    expect.assertions(1);
    return expect(uploadImage(GIF)).rejects.toMatchSnapshot();
  });
});

describe('Handle files dropped on screen', () => {
  test('array of images', () => {
    expect.assertions(1);
    const images = [TEST_IMAGE, TEST_IMAGE, TEST_IMAGE];
    const results = [successResult, successResult, successResult];
    return expect(Promise.all(dropImages(images))).resolves.toEqual(results);
  });

  test('array with single incorrect format file', async () => {
    expect.assertions(1);
    const arrayOfImages = [FILE_NOT_IMAGE];
    const results = dropImages(arrayOfImages);
    await expect(results[0]).rejects.toMatchSnapshot();
  });

  test('multiple images, with one wrong', async () => {
    expect.assertions(2);
    const arrayOfImages = [TEST_IMAGE, FILE_NOT_IMAGE];
    const results = dropImages(arrayOfImages);
    await expect(results[1]).rejects.toMatchSnapshot();
    await expect(results[0]).resolves.toEqual(successResult);
  });
});
