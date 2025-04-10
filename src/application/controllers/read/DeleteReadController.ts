import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { DeleteReadUseCase } from '../../useCases/read/DeleteReadUseCase';

import { UserIdSchema } from '../../schemas/user/UserIdSchema';
import { BookIdSchema } from '../../schemas/book/BookIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteReadController implements IController {
  constructor(private readonly deleteReadUseCase: DeleteReadUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const id = UserIdSchema.parse(userId);
      const bookId = BookIdSchema.parse(params?.bookId);

      await this.deleteReadUseCase.execute({
        bookId,
        userId: id,
      });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyReadErrors(error);
    }
  }
}
