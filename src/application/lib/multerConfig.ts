import path from 'node:path';

import multer from 'multer';

export function multerConfig({ directory }: { directory: 'users' | 'books' }) {
  const pathToSave =
    directory === 'users'
      ? path.resolve(__dirname, '..', '..', '..', 'uploads', 'users')
      : path.resolve(__dirname, '..', '..', '..', 'uploads', 'books');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, pathToSave);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  return multer({
    storage: storage,
  });
}
