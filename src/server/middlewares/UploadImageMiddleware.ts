import path from 'node:path';

import multer, { FileFilterCallback } from 'multer';

import { Request } from 'express';

export class UploadImageMiddleware {
  handle(): multer.Multer {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', '..', '..', 'uploads'));
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

    const fileFilter = (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback,
    ) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true); // Aceita o arquivo
      } else {
        cb(null, false); // Passa um erro
      }
    };

    const upload = multer({
      storage: storage,
      limits: { fileSize: 1024 * 1024 * 5 },
      fileFilter,
    });

    return upload;
  }
}
