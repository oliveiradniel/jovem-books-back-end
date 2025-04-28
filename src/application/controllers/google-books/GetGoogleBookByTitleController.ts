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
      await this.getUserByIdUseCase.execute({ userId });

      const { startIndex, title } = GetGoogleBooksByTitleSchema.parse({
        startIndex: Number(queryParams?.startIndex),
        title: queryParams?.title,
      });

      const googleBook = await this.getGoogleBookByTitleUseCase.execute({
        startIndex,
        title,
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
