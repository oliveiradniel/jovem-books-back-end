import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { randomUUID } from 'node:crypto';

import { env } from '../../config/env';

import { MimeTypeIsNotAllowed } from '../../application/errors/upload/MimeTypeIsNotAllowed';
import { MimeTypeIsRequired } from '../../application/errors/upload/MimeTypeIsRequired';
import { VeryLargeFile } from '../../application/errors/upload/VeryLargeFile';

export async function generateUserAvatarUploadURL(
  mimeType: string,
  fileSize: number,
) {
  if (!mimeType) {
    throw new MimeTypeIsRequired();
  }

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  if (fileSize > MAX_SIZE) {
    throw new VeryLargeFile();
  }

  const allowedMimes = ['image/jpeg', 'image/png'];
  if (!allowedMimes.includes(mimeType)) {
    throw new MimeTypeIsNotAllowed();
  }

  const mimeTypeLabels: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
  };

  const Key = `book-cover/${randomUUID()}.${mimeTypeLabels[mimeType]}`;

  const s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new PutObjectCommand({
    Bucket: env.BUCKET_NAME,
    Key,
    ContentType: mimeType,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  return { url, key: Key };
}
