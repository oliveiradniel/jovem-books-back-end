import { verifyGoogleBooksErrors } from '../../../utils/verifyGoogleBooksErrors';

import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';
import { GetGoogleBooksByTitleUseCase } from '../../useCases/google-books/GetGoogleBooksByTitleUseCase';

import { GetGoogleBooksByTitleSchema } from '../../schemas/google-books/GetGoogleBooksByTitleSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetGoogleBooksByTitleController implements IController {
  constructor(
    private readonly getGoogleBookByTitleUseCase: GetGoogleBooksByTitleUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async handle({ userId, queryParams }: IRequest): Promise<IResponse> {
    try {
      // const { startIndex, maxResults } = queryParams!;

      await this.getUserByIdUseCase.execute({ userId });

      const { title } = GetGoogleBooksByTitleSchema.parse({
        title: queryParams?.title,
        // startIndex: Number(startIndex),
        // maxResults: Number(maxResults),
      });

      const googleBook = await this.getGoogleBookByTitleUseCase.execute({
        title,
      });

      return {
        statusCode: 200,
        body: googleBook,
      };
    } catch (error) {
      console.log(error);
      return verifyGoogleBooksErrors(error);
    }
  }
}
