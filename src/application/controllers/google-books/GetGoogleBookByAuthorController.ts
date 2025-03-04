import { ZodError } from 'zod';

import { GetGoogleBookByAuthorUseCase } from '../../useCases/google-books/GetGoogleBookByAuthorUseCase';
import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';

import { GetGoogleBookByAuthorSchema } from '../../schemas/google-books/GetGoogleBookByAuthorSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetGoogleBookByAuthorController implements IController {
  constructor(
    private readonly getGoogleBookByAuthorUseCase: GetGoogleBookByAuthorUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async handle({ userId, body, queryParams }: IRequest): Promise<IResponse> {
    try {
      const { startIndex, maxResults } = queryParams!;
      const { authorName } = body;

      const data = GetGoogleBookByAuthorSchema.parse({
        authorName,
        startIndex: Number(startIndex),
        maxResults: Number(maxResults),
      });

      await this.getUserByIdUseCase.execute({ userId });

      const googleBook = await this.getGoogleBookByAuthorUseCase.execute(data);

      return {
        statusCode: 200,
        body: googleBook,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: error.errors[0].message },
        };
      }
      console.log(error);
      return {
        statusCode: 500,
        body: { error: 'Internal Server Error - Google Books' },
      };
    }
  }
}
