import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { UpdateBookUseCase } from '../../useCases/book/UpdateBookUseCase';

import { UpdateBookSchema } from '../../schemas/book/UpdateBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateBookController implements IController {
  constructor(private readonly updateBookUseCase: UpdateBookUseCase) {}

  async handle({ body, params, userId }: IRequest): Promise<IResponse> {
    try {
      const bookData = {
        id: params?.id,
        userId,
        title: body.title,
        author: body.author,
        sinopse: body.sinopse,
        numberOfPages: body.numberOfPages,
        type: body.type,
        dateOfPublication: body.dateOfPublication,
        updatedAt: new Date(),
      };

      const data = UpdateBookSchema.parse(bookData);

      await this.updateBookUseCase.execute(data);

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
