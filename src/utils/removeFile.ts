import fs from 'node:fs/promises';
import path from 'node:path';

interface RemoveFileProps {
  filename: string;
}

export async function removeFile({ filename }: RemoveFileProps) {
  await fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', filename));
}
