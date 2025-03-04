import { ZodError } from 'zod';

import { GetGoogleBookByTitleUseCase } from '../../useCases/google-books/GetGoogleBookByTitleUseCase';
import { GetGoogleBookByTitleSchema } from '../../schemas/google-books/GetGoogleBookByTitleSchema';

import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetGoogleBookByTitleController implements IController {
  constructor(
    private readonly getGoogleBookByTitleUseCase: GetGoogleBookByTitleUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async handle({ userId, body, queryParams }: IRequest): Promise<IResponse> {
    try {
      const { startIndex, maxResults } = queryParams!;
      const { title } = body;

      const data = GetGoogleBookByTitleSchema.parse({
        title,
        startIndex: Number(startIndex),
        maxResults: Number(maxResults),
      });

      await this.getUserByIdUseCase.execute({ userId });

      const googleBook = await this.getGoogleBookByTitleUseCase.execute(data);

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
