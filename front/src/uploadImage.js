// @flow
import filestack from 'filestack-js';
console.log(filestack);
const fs = filestack.init(process.env.REACT_APP_FILESTACK_SECRET);

// type Source = String;

const SUCCESS_STATUS = 'Stored';

export const FAILED_MESSAGE = 'Image Upload Failed';

const uploadImage = files =>
  new Promise((resolve, reject) => {
    // check if source is valid string
    // upload the image

    return fs
      .upload(files[0], {}, {})
      .then(res => {
        const { status } = res;
        if (status === SUCCESS_STATUS) {
          return resolve(res);
        }
        return reject(Error(FAILED_MESSAGE));
      })
      .catch(err => reject(Error(FAILED_MESSAGE)));
  });

export default uploadImage;
