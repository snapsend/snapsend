/* Mocking filestack-js */

export const FAILED_MESSAGE = 'Image Upload Failed';

export const successResult = {
  filename: 'img.jpg',
  handle: 'EL30NOJkQ9WJ2B0TBdoE',
  mimetype: 'image/jpeg',
  size: 1043074,
  status: 'Stored',
  url: 'https://cdn.filestackcontent.com/EL30NOJkQ9WJ2B0TBdoE',
};

export const errorResult = FAILED_MESSAGE;

export function rejectWithError(err = errorResult) {
  return new Promise((resolve, reject) => {
    return process.nextTick(() => reject(err));
  });
}

export function resolveSuccessfully() {
  return new Promise((resolve, reject) => {
    return process.nextTick(() => resolve(successResult));
  });
}
// defining default behavior of the mock to return success.
export const upload = jest.fn().mockImplementation(resolveSuccessfully);

export default {
  init: jest.fn(() => ({
    upload,
  })),
};
