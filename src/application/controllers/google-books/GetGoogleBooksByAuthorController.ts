import { verifyGoogleBooksErrors } from '../../../utils/verifyGoogleBooksErrors';

import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';
import { GetGoogleBooksByAuthorUseCase } from '../../useCases/google-books/GetGoogleBooksByAuthorUseCase';

import { GetGoogleBooksByAuthorSchema } from '../../schemas/google-books/GetGoogleBooksByAuthorSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetGoogleBooksByAuthorController implements IController {
  constructor(
    private readonly getGoogleBooksByAuthorUseCase: GetGoogleBooksByAuthorUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async handle({ userId, queryParams }: IRequest): Promise<IResponse> {
    try {
      await this.getUserByIdUseCase.execute(userId);

      const author = GetGoogleBooksByAuthorSchema.parse(queryParams?.author);

      const googleBooks = await this.getGoogleBooksByAuthorUseCase.execute(
        author,
      );

      return {
        statusCode: 200,
        body: googleBooks,
      };
    } catch (error) {
      return verifyGoogleBooksErrors(error);
    }
  }
}
