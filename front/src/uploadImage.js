// @flow
import React from 'react';
import type { Node } from 'react';
import filestack from 'filestack-js';
import accept from 'attr-accept';
import DropzoneComp from 'react-dropzone';
import type {
  Image as ImageType,
  UnfinishedEnvelope,
  Format,
  Size,
} from './types';

const fs = filestack.init(process.env.REACT_APP_FILESTACK_SECRET);

const SUCCESS_STATUS = 'Stored';
const LOGGED_OUT_LIMIT = 40;
const LOGGED_IN_LIMIT = 1000;

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

export const handleDrop = (files: Array<File>, isLoggedIn: boolean) => {
  const overSignedOut = !isLoggedIn && files.length > LOGGED_OUT_LIMIT;
  const overSignedIn = isLoggedIn && files.length > LOGGED_IN_LIMIT;
  if (overSignedIn || overSignedOut) return 'Too many files';
  return files.map(file => uploadImage(file));
};

export const uploadImage = (file: File): Promise<ImageType> =>
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

const Dropzone = ({
  children,
  onDrop,
  ...props
}: {
  children: Node,
  onDrop: (acceptedFiles: Array<File>) => void,
  props?: {},
}) => (
  <DropzoneComp
    onDrop={onDrop}
    accept={ACCEPTED_TYPES.join(',')}
    disableClick
    style={{
      position: 'relative',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }}
    {...props}
  >
    {children}
  </DropzoneComp>
);

export default Dropzone;

// export const transformMany = async (
//   images: Array<ImageType>,
//   maxWidth: ?number,
//   maxHeight: ?number
// ) => {
//   // do a promise all for each image.
//   const promiseArray = images.map(im => transform(im.url, maxWidth, maxHeight));
//   const res = await Promise.all(promiseArray);
//   return res;
// };

// export const transform = async (
//   handle: string,
//   maxWidth: ?number,
//   maxHeight: ?number
// ) => {
//   return fs.transform('url', {
//     resize: {
//       width: maxWidth,
//       height: maxHeight,
//     },
//   });
// };

// export const generateDownloadUrl = async (
//   images: Array<ImageType>,
//   envelope: ?UnfinishedEnvelope,
//   format: Format,
//   size: Size,
//   noneSelected: boolean
// ): Promise<string> => {
//   // start with the base url
//   const baseUrl = 'https://process.filestackapi.com/';

//   const transformedImages = await transformMany(
//     images,
//     size.width,
//     size.height
//   );

//   let imagesString = images.reduce((currString, im, ind) => {
//     const split = im.url.split('/');
//     const handle = split[split.length - 1];
//     if (im.selected || noneSelected) {
//       if (currString.length > 0) return `${currString},${handle}`;
//       return handle;
//     }
//     return currString;
//   }, '');

//   if (images.length > 1) imagesString = `[${imagesString}]`;

//   let formatString = '';
//   if (format === 'JPG') {
//     formatString = 'output=format:jpg/';
//   } else if (format === 'PNG') {
//     formatString = 'output=format:png/';
//   }

//   let resize = '';
//   if (size.width || size.height) {
//     let w = '';
//     let h = '';
//     if (size.width) w = `width:${size.width}`;
//     if (size.height) h = `height:${size.height}`;
//     if (size.width && size.height) {
//       w = `${w},`;
//       h = `${h}/`;
//     } else {
//       w = `${w}/`;
//     }

//     resize = `resize=${w}${h}`;
//   }
//   const result = `${baseUrl}${resize}${formatString}zip/${imagesString}`;
//   return result;
// };
