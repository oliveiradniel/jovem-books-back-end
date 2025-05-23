import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { randomUUID } from 'node:crypto';

export async function generateUserAvatarUploadURL(mimeType: string) {
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
