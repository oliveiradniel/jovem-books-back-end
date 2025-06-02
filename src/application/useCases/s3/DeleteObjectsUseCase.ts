import { ObjectIdentifier, S3 } from '@aws-sdk/client-s3';
import { env } from '../../../config/env';

export class DeleteObjectsUseCase {
  async execute({ keys }: { keys: ObjectIdentifier[] }) {
    const s3 = new S3();

    await s3.deleteObjects({
      Bucket: env.BUCKET_NAME,
      Delete: { Objects: keys },
    });
  }
}
