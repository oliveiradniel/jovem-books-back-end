import { IBook } from '../../../@types/IBook';

import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { GetBookByIdUseCase } from '../../useCases/book/GetBookByIdUseCase';
import { UpdateBookUseCase } from '../../useCases/book/UpdateBookUseCase';

import { IdUserSchema } from '../../schemas/UserSchemas';
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
      const { userId: id } = IdUserSchema.parse({ userId });
      const { bookId } = IdBookSchema.parse({ bookId: params?.id });

      const book = await this.getBookByIdUseCase.execute({
        bookId,
        userId: id,
      });

      const bookData = {
        userId,
        bookId,
        title: body.title ?? book.title,
        authors: body.authors ?? book.authors,
        sinopse: body.sinopse ?? book.sinopse,
        literaryGenre: body.literaryGenre ?? book.literaryGenre,
        removeImage: body.removeImage,
      };

      const data = UpdateBookSchema.parse(bookData);

      const updatedBook = await this.updateBookUseCase.execute({
        ...data,
        imagePath: body.removeImage ? null : file?.filename ?? book.imagePath,
      });

      return {
        statusCode: 200,
        body: updatedBook as IBook,
      };
    } catch (error) {
      console.log(error);
      return verifyBookErrors(error);
    }
  }
}
