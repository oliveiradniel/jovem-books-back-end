import { DeleteObjectUseCase } from '../../application/useCases/s3/DeleteObjectUseCase';

export function makeDeleteObjectUseCase() {
  return new DeleteObjectUseCase();
}
