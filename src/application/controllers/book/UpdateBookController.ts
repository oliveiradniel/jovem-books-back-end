import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { UpdateBookUseCase } from '../../useCases/book/UpdateBookUseCase';

import { BookIdSchema } from '../../schemas/book/BookIdSchema';
import { UpdateBookSchema } from '../../schemas/book/UpdateBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateBookController implements IController {
  constructor(private readonly updateBookUseCase: UpdateBookUseCase) {}

  async handle({ body, params, userId }: IRequest): Promise<IResponse> {
    try {
      const bookId = BookIdSchema.parse(params?.id);

      const data = UpdateBookSchema.parse({
        userId,
        ...body,
        updatedAt: new Date(),
      });

      await this.updateBookUseCase.execute({ bookId, data });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
