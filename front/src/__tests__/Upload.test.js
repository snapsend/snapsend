import filestack, { upload } from 'filestack-js';
import uploadImage from '../uploadImage';
import {
  successResult,
  errorResult,
  rejectWithError,
} from '../../__mocks__/filestack-js';

const TEST_IMAGE = './data/test.jpg';

describe('upload to filestack', () => {
  test('When input is not an array of strings, it returns proper error', () => {
    expect.assertions(1);
    return expect(uploadImage(TEST_IMAGE)).rejects.toMatchSnapshot();
  });

  test('if upload succeeds, it should return the image payload', () => {
    return uploadImage(TEST_IMAGE).then(res => {
      return expect(res).toEqual(successResult);
    });
  });

  test('When upload fails, it returns the right error', () => {
    expect.assertions(1);
    upload.mockImplementationOnce(rejectWithError);

    return expect(uploadImage(TEST_IMAGE)).rejects.toMatchSnapshot();
  });

  test('When input is not a file, it returns the right error', () => {
    expect.assertions(1);
    const notAFile = '../asdfj';
    return expect(uploadImage(notAFile)).rejects.toMatchSnapshot();
  });

  test('When image is wrong format, it returns the right error', () => {
    expect.assertions(1);
    const fileInWrongFormat = './data/notAnImage.rtf';
    return expect(uploadImage(fileInWrongFormat)).rejects.toMatchSnapshot();
  });
  test('When input is multiple files, it returns an array of promises', () => {
    expect.assertions(3);
    const arrayOfImages = [
      TEST_IMAGE,
      './data/test1.jpeg',
      './data/test2.jpeg',
    ];
    const result = uploadImage(arrayOfImages);
    return result.forEach(res => expect(res).resolves.toEqual(successResult));
  });
});
