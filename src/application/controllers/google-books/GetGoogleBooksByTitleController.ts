import { verifyGoogleBooksErrors } from '../../../utils/verifyGoogleBooksErrors';

import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';
import { GetGoogleBooksByTitleUseCase } from '../../useCases/google-books/GetGoogleBooksByTitleUseCase';

import { GetGoogleBooksByTitleSchema } from '../../schemas/google-books/GetGoogleBooksByTitleSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetGoogleBooksByTitleController implements IController {
  constructor(
    private readonly getGoogleBooksByTitleUseCase: GetGoogleBooksByTitleUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async handle({ userId, queryParams }: IRequest): Promise<IResponse> {
    try {
      await this.getUserByIdUseCase.execute(userId);

      const title = GetGoogleBooksByTitleSchema.parse(queryParams?.title);

      const googleBooks = await this.getGoogleBooksByTitleUseCase.execute(
        title,
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
