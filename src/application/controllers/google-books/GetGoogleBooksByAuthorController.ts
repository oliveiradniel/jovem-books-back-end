import { verifyGoogleBooksErrors } from '../../../utils/verifyGoogleBooksErrors';

import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';
import { GetGoogleBooksByAuthorUseCase } from '../../useCases/google-books/GetGoogleBooksByAuthorUseCase';

import { GetGoogleBooksByAuthorSchema } from '../../schemas/google-books/GetGoogleBooksByAuthorSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetGoogleBooksByAuthorController implements IController {
  constructor(
    private readonly getGoogleBookByAuthorUseCase: GetGoogleBooksByAuthorUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async handle({ userId, queryParams }: IRequest): Promise<IResponse> {
    try {
      await this.getUserByIdUseCase.execute({ userId });

      const { author, startIndex } = GetGoogleBooksByAuthorSchema.parse({
        author: queryParams?.author,
        startIndex: Number(queryParams?.startIndex),
      });

      const googleBook = await this.getGoogleBookByAuthorUseCase.execute({
        startIndex,
        author,
      });

      return {
        statusCode: 200,
        body: googleBook,
      };
    } catch (error) {
      return verifyGoogleBooksErrors(error);
    }
  }
}
