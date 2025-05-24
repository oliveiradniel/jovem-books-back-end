import { GeneratePresignedURLUseCase } from '../../application/useCases/s3/GeneratePresignedURLUseCase';

export function makeGeneratePreSignedURLUseCase() {
  return new GeneratePresignedURLUseCase();
}
