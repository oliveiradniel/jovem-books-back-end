import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { GetBookByIdUseCase } from '../../useCases/book/GetBookByIdUseCase';

import { BookIdAndUserIdSchema } from '../../schemas/book/BookIdAndUserIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetBookByIdController implements IController {
  constructor(private readonly getBookByIdUseCase: GetBookByIdUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const bookData = {
        bookId: params?.id,
        userId,
      };

      const data = BookIdAndUserIdSchema.parse(bookData);

      const book = await this.getBookByIdUseCase.execute(data);

      return {
        statusCode: 200,
        body: book,
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
