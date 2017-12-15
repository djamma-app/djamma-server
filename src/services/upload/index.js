import path from 'path';
import fs from 'fs';
import uuid from 'uuid/v4';
import Busboy from 'busboy';
import sh from 'shelljs';

const UPLOAD_FOLDER = path.join(__dirname, '..', '..', '..', 'uploads');

sh.mkdir('-p', UPLOAD_FOLDER);

export default req => {
  return new Promise(resolve => {
    let metadata = {};
    const busboy = new Busboy({ headers : req.headers });
    busboy.on('file', (_, file, filename) => {
      metadata = saveFile(file, path.extname(filename));
    });
    busboy.on('finish', () => resolve(metadata));
    return req.pipe(busboy);
  });
};

// Save on disk
// TODO Use Amazon S3 instead
export function saveFile(file, ext) {
  const id = uuid();
  const out = path.join(UPLOAD_FOLDER, `${id}${ext}`);
  file.pipe(fs.createWriteStream(out));
  return {
    id,
    path : out,
  };
}
