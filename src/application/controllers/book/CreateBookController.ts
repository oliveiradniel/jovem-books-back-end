import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { CreateBookUseCase } from '../../useCases/book/CreateBookUseCase';

import { CreateBookSchema } from '../../schemas/book';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateBookController implements IController {
  constructor(private readonly createBookUseCase: CreateBookUseCase) {}

  async handle({ userId, body }: IRequest): Promise<IResponse> {
    try {
      const bookData = {
        userId,
        title: body.title,
        authors: body.authors,
        sinopse: body.sinopse,
        numberOfPages: Number(body.numberOfPages),
        literaryGenre: body.literaryGenre,
      };

      const data = CreateBookSchema.parse(bookData);

      await this.createBookUseCase.execute(data);

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
