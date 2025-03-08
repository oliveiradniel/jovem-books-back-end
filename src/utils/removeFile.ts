import fs from 'node:fs/promises';
import path from 'node:path';

interface RemoveFileProps {
  filename: string;
  directory: 'users' | 'books';
}

export async function removeFile({ filename, directory }: RemoveFileProps) {
  if (directory === 'users') {
    await fs.unlink(
      path.resolve(__dirname, '..', '..', 'uploads', 'users', filename),
    );
  } else if (directory === 'books') {
    await fs.unlink(
      path.resolve(__dirname, '..', '..', 'uploads', 'books', filename),
    );
  }
}
