import { GenerateBookCoverUploadURLController } from '../../application/controllers/s3/GenerateBookCoverUploadURLController';

import { makeGeneratePreSignedURLUseCase } from './makeGeneratePreSignedURLUseCase';

export function makeGenerateBookCoverUploadURLController() {
  return new GenerateBookCoverUploadURLController(
    makeGeneratePreSignedURLUseCase(),
  );
}
