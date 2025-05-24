import { DeleteUserAvatarFromS3Controller } from '../../application/controllers/s3/DeleteUserAvatarFromS3Controller';

export function makeDeleteUserAvatarFromS3Controller() {
  return new DeleteUserAvatarFromS3Controller();
}
