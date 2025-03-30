import { removeFile } from '../../../utils/removeFile';
import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { CreateBookUseCase } from '../../useCases/book/CreateBookUseCase';

import { CreateDataBookSchema } from '../../schemas/book/CreateBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';
import { UserIdSchema } from '../../schemas/user/UserIdSchema';
import { GenreLiterary } from '@prisma/client';

export class CreateBookController implements IController {
  constructor(private readonly createBookUseCase: CreateBookUseCase) {}

  async handle({ userId, body, file }: IRequest): Promise<IResponse> {
    try {
      const authors: string[] =
        typeof body.authors === 'string' ? [body.authors] : body.authors;

      const genreLiterary: GenreLiterary[] =
        typeof body.genreLiterary === 'string'
          ? [body.genreLiterary]
          : body.genreLiterary;

      const bookData = {
        userId,
        title: body.title,
        sinopse: body.sinopse,
        imagePath: body.imagePath,
        numberOfPages: Number(body.numberOfPages),
        dateOfPublication: body.dateOfPublication,
      };

      const parsedUserId = UserIdSchema.parse(userId);

      const data = CreateDataBookSchema.parse({
        ...bookData,
        authors,
        genreLiterary,
      });

      await this.createBookUseCase.execute({
        userId: parsedUserId,
        data: { ...data, imagePath: file?.filename },
      });

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      await removeFile({ filename: file?.filename, directory: 'books' });
      return verifyBookErrors(error);
    }
  }
}
