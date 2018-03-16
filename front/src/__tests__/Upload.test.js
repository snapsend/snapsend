jest.mock('filestack-js');
import filestack, { upload } from 'filestack-js';
import uploadImage from '../uploadImage';
import { successResult, errorResult } from './__mocks__/filestack-js';

const TEST_IMAGE = './data/test.jpg';

describe('upload.js', () => {
  test('if upload succeeds, it should return the image payload', () => {
    return uploadImage(TEST_IMAGE).then(res => {
      return expect(res).toEqual(successResult);
    });
  });

  test('When image upload fails, it returns the standard error', () => {
    expect.assertions(1);
    upload.mockImplementationOnce(() => Promise.reject('ERROR'));
    // upload().catch(res => {
    //   console.log(res);
    // });
    return expect(uploadImage(TEST_IMAGE)).rejects.toMatchSnapshot();
  });

  test('When input is not a file, it returns ___ error', () => {
    // something
  });

  test('When image is wrong format, it returns ___ error', () => {
    // something
  });
});

// function uploadImage(src){
// 	uploadingImage = true;
// 	const res = filestack.upload(src);

// 	if (error) {
// 		return "There was an error";
// 	}
// 	else if (res === 'undefined'){
// 		return "Upload failed";
// 	}
// 	else if (status === "OK"){
// 		return "Upload succeeded"
// 	}
// 	return "Upload failed";
// }

test('placeholder test', () => {});
