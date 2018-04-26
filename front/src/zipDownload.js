//@flow
import type { Image, Format } from './types';
import JSZip from 'jszip';
import fs from 'file-saver';

/**
 * This exports a single function
 *  - takes in a list of images
 *  - loads the images, zips them and downloads the zip
 *  - returns t/f based on success failure
 *
 * 1. Make it work
 * 2. Make it give progress
 * 3. make it save with envelope name
 * 4. If no images, don't do it.
 * 5. give it a name
 */

export default async (
  images: Array<Image>,
  width: ?number,
  height: ?number,
  format: Format,
  envelopeName: string,
  handleProgress: number => void
): Promise<boolean> => {
  // instantiate your zip
  const zip = new JSZip();
  let downloaded = 0;
  const promises = images.map(async im => {
    // should return a promise for the loaded, zipped image
    const url = generateUrl(im, width, height, format);
    const data = fetchIm(url);
    downloaded++;
    handleProgress(downloaded);
    if (data) {
      const name = filename(im.filename, format);
      zip.file(name, data, { binary: true });
    }
  });

  const res = await Promise.all(promises);
  downloaded++;
  handleProgress(downloaded);
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
  });
  fs.saveAs(blob, `${envelopeName}.zip`);
  handleProgress(downloaded + 1);
  return true;
};

const filename = (name: string, format: ?Format): string => {
  const split = name.split('.');
  const first = split[0];
  if (format === 'JPG') {
    return `${first}.jpg`;
  }
  if (format === 'PNG') {
    return `${first}.png`;
  }
  return name;
};

// returns a promise for the fetched image
const fetchIm = async (url: string): Promise<any> => {
  const res = await fetch(url);
  if (res.status === 200) {
    return Promise.resolve(res.blob());
  }
  return null;
};

const generateUrl = (
  im: Image,
  width: ?number,
  height: ?number,
  format: Format
): string => {
  // start with the base url
  const baseUrl = 'https://process.filestackapi.com/';

  let formatString = '';
  if (format === 'JPG') {
    formatString = 'output=format:jpg/';
  } else if (format === 'PNG') {
    formatString = 'output=format:png/';
  }

  let resize = '';
  if (width || height) {
    let w = '';
    let h = '';
    if (width) w = `width:${width}`;
    if (height) h = `height:${height}`;
    if (width && height) {
      w = `${w},`;
      h = `${h}/`;
    } else {
      w = `${w}/`;
    }

    resize = `resize=${w}${h}`;
  }
  const result = `${baseUrl}${resize}${formatString}${im.url}`;
  return result;
};
