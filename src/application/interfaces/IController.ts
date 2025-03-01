import { ParsedQs } from 'qs';

export interface IRequest {
  body: Record<string, any>;
  queryParams?: ParsedQs;
  params?: Record<string, any>;
  userId?: string | undefined;
}

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
