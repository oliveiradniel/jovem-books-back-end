import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { UpdateBookUseCase } from '../../useCases/book/UpdateBookUseCase';

import { UpdateDataBookSchema } from '../../schemas/book/UpdateBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';
import { UserIdSchema } from '../../schemas/user/UserIdSchema';
import { BookIdSchema } from '../../schemas/book/BookIdSchema';

export class UpdateBookController implements IController {
  constructor(private readonly updateBookUseCase: UpdateBookUseCase) {}

  async handle({ userId, body, file, params }: IRequest): Promise<IResponse> {
    try {
      const id = UserIdSchema.parse(userId);
      const bookId = BookIdSchema.parse(params?.id);

      const data = UpdateDataBookSchema.parse({
        ...body,
      });

      await this.updateBookUseCase.execute({
        bookId,
        userId: id,
        data: { ...data, imagePath: file.filename ?? null },
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
