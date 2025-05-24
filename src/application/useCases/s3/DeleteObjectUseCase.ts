import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { env } from '../../../config/env';

export class DeleteObjectUseCase {
  async execute({ key }: { key: string }) {
    const s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new DeleteObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  }
}
