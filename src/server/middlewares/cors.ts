import { NextFunction, Request, Response } from 'express';

export function cors(request: Request, response: Response, next: NextFunction) {
  const allowedOrigins = [
    'https://www.jovembooks.com.br',
    'http://localhost:5173',
    'https://jovem-books-front-end.vercel.app',
    'https://jovem-books-front-end-git-main-daniels-projects-084e3000.vercel.app',
    'https://jovem-books-front-ew60lh8hg-daniels-projects-084e3000.vercel.app',
  ];

  const origin = request.header('origin')!;

  const isAllowed = allowedOrigins.includes(origin);

  if (isAllowed) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '10');
  }

  next();
}
