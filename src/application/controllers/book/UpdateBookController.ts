import { TBook } from '../../../@types/Book';

import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { GetBookByIdUseCase } from '../../useCases/book/GetBookByIdUseCase';
import { UpdateBookUseCase } from '../../useCases/book/UpdateBookUseCase';

import { IdUserSchema } from '../../schemas/user/IdUserSchema';
import { IdBookSchema } from '../../schemas/book/IdBookSchema';
import { UpdateBookSchema } from '../../schemas/book';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateBookController implements IController {
  constructor(
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
  ) {}

  async handle({ userId, body, file, params }: IRequest): Promise<IResponse> {
    try {
      const id = IdUserSchema.parse(userId);
      const bookId = IdBookSchema.parse(params?.id);

      const book = await this.getBookByIdUseCase.execute({
        bookId,
        userId: id,
      });

      const removeImage = JSON.parse(body.removeImage);

      const bookData = {
        userId: id,
        bookId: book.id,
        title: body.title ?? book.title,
        authors: body.authors ?? book.authors,
        sinopse: body.sinopse ?? book.sinopse,
        literaryGenre: body.literaryGenre ?? book.literaryGenre,
        imagePath: removeImage ? null : file?.filename ?? book.imagePath,
        removeImage,
      };

      const data = UpdateBookSchema.parse(bookData);

      const updatedBook = await this.updateBookUseCase.execute({
        ...data,
      });

      return {
        statusCode: 200,
        body: updatedBook as TBook,
      };
    } catch (error) {
      console.log(error);
      return verifyBookErrors(error);
    }
  }
}
