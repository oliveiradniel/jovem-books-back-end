import { verifyGoogleBooksErrors } from '../../../utils/verifyGoogleBooksErrors';

import { GetGoogleBookByAuthorUseCase } from '../../useCases/google-books/GetGoogleBookByAuthorUseCase';
import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';

import { GetGoogleBookByAuthorSchema } from '../../schemas/google-books/GetGoogleBookByAuthorSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetGoogleBookByAuthorController implements IController {
  constructor(
    private readonly getGoogleBookByAuthorUseCase: GetGoogleBookByAuthorUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async handle({ userId, queryParams }: IRequest): Promise<IResponse> {
    try {
      // const { startIndex, maxResults } = queryParams!;
      const author = queryParams?.author;

      const data = GetGoogleBookByAuthorSchema.parse({
        author,
        // startIndex: Number(startIndex),
        // maxResults: Number(maxResults),
      });

      await this.getUserByIdUseCase.execute({ userId });

      const googleBook = await this.getGoogleBookByAuthorUseCase.execute(data);

      return {
        statusCode: 200,
        body: googleBook,
      };
    } catch (error) {
      return verifyGoogleBooksErrors(error);
    }
  }
}
