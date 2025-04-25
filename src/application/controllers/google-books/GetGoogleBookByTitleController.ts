import { verifyGoogleBooksErrors } from '../../../utils/verifyGoogleBooksErrors';

import { GetGoogleBookByTitleUseCase } from '../../useCases/google-books/GetGoogleBookByTitleUseCase';
import { GetGoogleBookByTitleSchema } from '../../schemas/google-books/GetGoogleBookByTitleSchema';

import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetGoogleBookByTitleController implements IController {
  constructor(
    private readonly getGoogleBookByTitleUseCase: GetGoogleBookByTitleUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async handle({ userId, queryParams }: IRequest): Promise<IResponse> {
    try {
      // const { startIndex, maxResults } = queryParams!;
      const title = queryParams?.title;

      const data = GetGoogleBookByTitleSchema.parse({
        title,
        // startIndex: Number(startIndex),
        // maxResults: Number(maxResults),
      });

      await this.getUserByIdUseCase.execute({ userId });

      const googleBook = await this.getGoogleBookByTitleUseCase.execute(data);

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
