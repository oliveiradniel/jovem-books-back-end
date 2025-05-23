import { GenerateUserAvatarUploadURLController } from '../../application/controllers/s3/GenerateUserAvatarUploadURLController';

export function makeGenerateUserAvatarUploadURLController() {
  return new GenerateUserAvatarUploadURLController();
}
