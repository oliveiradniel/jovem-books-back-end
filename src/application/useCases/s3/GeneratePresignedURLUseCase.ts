import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { randomUUID } from 'node:crypto';

import { env } from '../../../config/env';

export class GeneratePresignedURLUseCase {
  async execute({ mimeType, folder }: { mimeType: string; folder: string }) {
    const mimeTypeLabels: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
    };

    const key = `${folder}/${randomUUID()}.${mimeTypeLabels[mimeType]}`;

    const s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new PutObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: key,
      ContentType: mimeType,
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 5, // 5 minutes
    });

    return { url, key };
  }
}
