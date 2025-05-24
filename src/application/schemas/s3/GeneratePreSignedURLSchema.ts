import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB em bytes

export const GeneratePreSignedURLSchema = z.object({
  mimeType: z.enum(['image/jpeg', 'image/jpg', 'image/png'], {
    message: 'Only JPG and PNG files are accepted',
  }),
  fileSize: z
    .number({ message: 'File size must be a number' })
    .max(MAX_FILE_SIZE, { message: 'The file must be a maximum of 5MB' }),
});
