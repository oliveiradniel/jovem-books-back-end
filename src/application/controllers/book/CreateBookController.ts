import { removeFile } from '../../../utils/removeFile';
import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { CreateBookUseCase } from '../../useCases/book/CreateBookUseCase';

import { UserIdSchema } from '../../schemas/user/UserIdSchema';
import { CreateDataBookSchema } from '../../schemas/book/CreateBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateBookController implements IController {
  constructor(private readonly createBookUseCase: CreateBookUseCase) {}

  async handle({ userId, body, file }: IRequest): Promise<IResponse> {
    try {
      const bookData = {
        userId,
        title: body.title,
        authors: body.authors,
        sinopse: body.sinopse,
        numberOfPages: Number(body.numberOfPages),
        genreLiterary: body.genreLiterary,
      };

      const parsedUserId = UserIdSchema.parse(userId);

      const data = CreateDataBookSchema.parse({
        ...bookData,
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
      if (file) {
        await removeFile({ filename: file?.filename, directory: 'books' });
      }
      return verifyBookErrors(error);
    }
  }
}
