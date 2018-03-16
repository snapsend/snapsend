// @flow
import filestack from 'filestack-js';
import accept from 'attr-accept';
const fs = filestack.init(process.env.REACT_APP_FILESTACK_SECRET);

// type Source = String;

const SUCCESS_STATUS = 'Stored';

const WRONG_TYPE_ERROR = 'Input is not the right format';

export const ACCEPTED_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/webp',
  'image/tiff',
  'image/x-tiff',
];

export const FAILED_MESSAGE = 'Image Upload Failed';

const handleUploadDrop = files => {
  return files.map(file => uploadImage(file));
};

export const uploadImage = file =>
  new Promise((resolve, reject) => {
    // make sure you got the right file type
    if (!accept(file, ACCEPTED_TYPES)) return reject(WRONG_TYPE_ERROR);

    fs
      .upload(file, {}, {})
      .then(res => {
        const { status } = res;
        if (status === SUCCESS_STATUS) {
          return resolve(res);
        }
        return reject(FAILED_MESSAGE);
      })
      .catch(err => reject(FAILED_MESSAGE));
  });

export default handleUploadDrop;
