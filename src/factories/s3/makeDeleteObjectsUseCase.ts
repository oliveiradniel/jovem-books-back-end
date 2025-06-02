import { DeleteObjectsUseCase } from '../../application/useCases/s3/DeleteObjectsUseCase';

export function makeDeleteObjectsUseCase() {
  return new DeleteObjectsUseCase();
}
