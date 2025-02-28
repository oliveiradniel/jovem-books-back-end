import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { DeleteBookUseCase } from '../../useCases/book/DeleteBookUseCase';

import { BookIdAndUserIdSchema } from '../schemas/book/BookIdAndUserIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteBookController implements IController {
  constructor(private readonly deleteBookUseCase: DeleteBookUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const data = BookIdAndUserIdSchema.parse({ bookId: params?.id, userId });

      await this.deleteBookUseCase.execute({
        bookId: data.bookId,
        userId: data.userId,
      });

      return {
        statusCode: 200,
        body: null,
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
