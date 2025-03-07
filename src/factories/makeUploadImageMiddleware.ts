import { UploadImageMiddleware } from '../server/middlewares/UploadImageMiddleware';

export function makeUploadImageMiddleware() {
  return new UploadImageMiddleware();
}
