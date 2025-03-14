import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { UpdateBookUseCase } from '../../useCases/book/UpdateBookUseCase';

import {
  IdsSchema,
  UpdateDataBookSchema,
} from '../../schemas/book/UpdateBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateBookController implements IController {
  constructor(private readonly updateBookUseCase: UpdateBookUseCase) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const { bookId: parsedBookId, userId: parsedUserId } = IdsSchema.parse({
        bookId: params?.id,
        userId,
      });

      const data = UpdateDataBookSchema.parse({
        ...body,
        updatedAt: new Date(),
      });

      await this.updateBookUseCase.execute({
        bookId: parsedBookId,
        userId: parsedUserId,
        data,
      });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
