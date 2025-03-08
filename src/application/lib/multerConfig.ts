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

  function fileFilter(
    req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) {
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(null, false);
    }

    cb(null, true);
  }

  return multer({
    storage: storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
}
