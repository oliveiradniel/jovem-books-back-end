import path from 'node:path';

import multer from 'multer';

export function multerConfig() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'uploads', 'users'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  return multer({
    storage: storage,
  });
}
