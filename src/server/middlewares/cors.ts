import { NextFunction, Request, Response } from 'express';

export function cors(request: Request, response: Response, next: NextFunction) {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://jovem-books-front-end.vercel.app/',
  ];

  const origin = request.header('origin')!;

  const isAllowed = allowedOrigins.includes(origin);

  if (isAllowed) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '10');
  }

  next();
}
