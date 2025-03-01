import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { CreateBookUseCase } from '../../useCases/book/CreateBookUseCase';

import { CreateBookSchema } from '../../schemas/book/CreateBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateBookController implements IController {
  constructor(private readonly createBookUseCase: CreateBookUseCase) {}

  async handle({ body, userId }: IRequest): Promise<IResponse> {
    try {
      const bookData = {
        userId,
        title: body.title,
        author: body.author,
        sinopse: body.sinopse,
        numberOfPages: body.numberOfPages,
        type: body.type,
        dateOfPublication: body.dateOfPublication,
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
