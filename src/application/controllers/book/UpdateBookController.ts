import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { UpdateBookUseCase } from '../../useCases/book/UpdateBookUseCase';

import { UpdateDataBookSchema } from '../../schemas/book/UpdateBookSchema';

import { UserIdSchema } from '../../schemas/user/UserIdSchema';
import { BookIdSchema } from '../../schemas/book/BookIdSchema';
import { GetBookByIdUseCase } from '../../useCases/book/GetBookByIdUseCase';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateBookController implements IController {
  constructor(
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
  ) {}

  async handle({ userId, body, file, params }: IRequest): Promise<IResponse> {
    try {
      const id = UserIdSchema.parse(userId);
      const bookId = BookIdSchema.parse(params?.id);

      const data = UpdateDataBookSchema.parse({
        ...body,
      });

      const book = await this.getBookByIdUseCase.execute({
        bookId,
        userId: id,
      });

      const updatedBook = await this.updateBookUseCase.execute({
        bookId,
        userId: id,
        data: { ...data, imagePath: file?.filename ?? book.imagePath },
      });

      return {
        statusCode: 200,
        body: updatedBook!,
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
