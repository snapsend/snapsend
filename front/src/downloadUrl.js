const makeSingleLink = (
  image: ImageType,
  envelope: ?UnfinishedEnvelope,
  format: Format,
  size: Size,
  noneSelected: boolean
) => {
  const url = image.url;
};

const generateDownloadUrl = (
  images: Array<ImageType>,
  envelope: ?UnfinishedEnvelope,
  format: Format,
  size: Size,
  noneSelected: boolean
) => {
  // start with the base url
  const baseUrl = 'https://process.filestackapi.com/';

  let imagesString = images.reduce((currString, im, ind) => {
    const split = im.url.split('/');
    const handle = split[split.length - 1];
    if (im.selected || noneSelected) {
      if (currString.length > 0) return `${currString},${handle}`;
      return handle;
    }
    return currString;
  }, '');

  if (images.length > 1) imagesString = `[${imagesString}]`;

  let formatString = '';
  if (format === 'JPG') {
    formatString = 'output=format:jpg/';
  } else if (format === 'PNG') {
    formatString = 'output=format:png/';
  }

  let resize = '';
  if (size.width || size.height) {
    let w = '';
    let h = '';
    if (size.width) w = `width:${size.width}`;
    if (size.height) h = `height:${size.height}`;
    if (size.width && size.height) {
      w = `${w},`;
      h = `${h}/`;
    } else {
      w = `${w}/`;
    }

    resize = `resize=${w}${h}`;
  }
  const result = `${baseUrl}${resize}${formatString}zip/${imagesString}`;
  return result;
};
