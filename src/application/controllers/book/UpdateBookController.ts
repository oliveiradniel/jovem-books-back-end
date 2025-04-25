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

      const book = await this.getBookByIdUseCase.execute({
        bookId,
        userId: id,
      });

      const bookData = {
        userId,
        title: body.title ?? book.title,
        authors: body.authors ?? book.authors,
        sinopse: body.sinopse ?? book.sinopse,
        literaryGenre: body.literaryGenre ?? book.literaryGenre,
      };

      const data = UpdateDataBookSchema.parse(bookData);

      const updatedBook = await this.updateBookUseCase.execute({
        bookId,
        userId: id,
        data: {
          ...data,
          imagePath: body.removeImage ? null : file?.filename ?? book.imagePath,
        },
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
