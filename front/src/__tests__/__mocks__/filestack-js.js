/* Mocking filestack-js */
import { FAILED_MESSAGE } from '../../uploadImage';

export const successResult = {
  filename: 'img.jpg',
  handle: 'EL30NOJkQ9WJ2B0TBdoE',
  mimetype: 'image/jpeg',
  size: 1043074,
  status: 'Stored',
  url: 'https://cdn.filestackcontent.com/EL30NOJkQ9WJ2B0TBdoE',
};

export const errorResult = Error(FAILED_MESSAGE);

export default {
  init: jest.fn(() => ({
    upload,
  })),
};

// defining default behavior of the mock to return success.
export const upload = jest.fn(() => Promise.resolve(successResult));
// export const upload = jest.fn(() => Promise.reject('ERROR'));

// function upload(file) {
//   return new Promise(res => {
//     // here we need toooooo...
//     // return correctly when it's a file?
//     // reject when it isn't supposed to work. How am I supposed to know?
//     // Maybe this is just the default method?
//     process.nextTick(() => resolve('Things went okay'));
//   });
// }

function rejectWithError(err) {
  return new Promise(res => {
    process.nextTick(() => reject(err));
  });
}
