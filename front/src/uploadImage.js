// @flow
import filestack from 'filestack-js';
console.log(filestack);
const fs = filestack.init(process.env.REACT_APP_FILESTACK_SECRET);

// type Source = String;

const uploadImage = files => {
  // check if source is valid string
  // upload the image
  console.log('FILES', files);

  fs.upload(files[0], {}, {}).then(res => {
    console.log('DONE', res);
  });
};

export default uploadImage;
