import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { randomUUID } from 'node:crypto';

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
    'image/jpg': 'jpg',
    'image/png': 'png',
  };

  const Key = `${randomUUID()}.${mimeTypeLabels[mimeType]}`;

  const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: '',
      secretAccessKey: '',
    },
  });

  const command = new PutObjectCommand({
    Bucket: 'jovem-books/book-cover',
    Key,
    ContentType: mimeType,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  return { url, key: Key };
}
