import { IBook } from '../../../@types/IBook';

import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { ListBooksUseCase } from '../../useCases/book/ListBooksUseCase';

import { ListBooksSchema } from '../../schemas/book/ListBooksSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListBooksController implements IController {
  constructor(private readonly listBooksUseCase: ListBooksUseCase) {}

  async handle({ userId, queryParams }: IRequest): Promise<IResponse> {
    try {
      const orderBy = queryParams?.orderBy;

      const data = ListBooksSchema.parse({
        userId,
        orderBy,
      });

      const books = await this.listBooksUseCase.execute(data);

      return {
        statusCode: 200,
        body: books as IBook[],
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
