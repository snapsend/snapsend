jest.mock('filestack-js');
import filestack, { upload } from 'filestack-js';
import uploadImage from '../uploadImage';
import { successResult, errorResult } from './__mocks__/filestack-js';

describe('upload.js', () => {
  test('if upload succeeds, it should return the url', () => {
    uploadImage('image').then(res => {
      expect(result).toBe(successResult);
    });
  });

  test('When image upload fails, it returns the error code', () => {
    // somethinog
    uploadImage.mockImplementationOnce(() => Promise.reject(errorResult));
    uploadImage('image').then(res => {
      expect(result).toBe(errorResult);
    });
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
