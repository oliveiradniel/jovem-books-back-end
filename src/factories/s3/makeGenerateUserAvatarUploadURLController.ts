import { GenerateUserAvatarUploadURLController } from '../../application/controllers/s3/GenerateUserAvatarUploadURLController';

import { makeGeneratePreSignedURLUseCase } from './makeGeneratePreSignedURLUseCase';

export function makeGenerateUserAvatarUploadURLController() {
  return new GenerateUserAvatarUploadURLController(
    makeGeneratePreSignedURLUseCase(),
  );
}
