import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { DeleteBookUseCase } from '../../useCases/book/DeleteBookUseCase';

import { BookIdAndUserIdSchema } from '../../schemas/book/BookIdAndUserIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteBookController implements IController {
  constructor(private readonly deleteBookUseCase: DeleteBookUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const bookData = {
        bookId: params?.id,
        userId,
      };

      const data = BookIdAndUserIdSchema.parse(bookData);

      await this.deleteBookUseCase.execute(data);

      return {
        statusCode: 200,
        body: null,
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
