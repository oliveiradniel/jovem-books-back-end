import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { DeleteBookUseCase } from '../../useCases/book/DeleteBookUseCase';

import { DeleteBookSchema } from '../../schemas/book';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteBookController implements IController {
  constructor(private readonly deleteBookUseCase: DeleteBookUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const { userId: id, bookId } = DeleteBookSchema.parse({
        userId,
        bookId: params?.id,
      });

      await this.deleteBookUseCase.execute({ bookId, userId: id });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
