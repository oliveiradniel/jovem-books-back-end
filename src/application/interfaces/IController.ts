import { ParsedQs } from 'qs';

export interface IRequest {
  userId: string;
  body: Record<string, any>;
  params?: Record<string, any>;
  queryParams?: ParsedQs & { title?: string };
  // file: Express.Multer.File;
}

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
