import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { GetBookByIdUseCase } from '../../useCases/book/GetBookByIdUseCase';

import { UserIdSchema } from '../../schemas/user/UserIdSchema';
import { IdBookSchema } from '../../schemas/book/IdBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetBookByIdController implements IController {
  constructor(private readonly getBookByIdUseCase: GetBookByIdUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const id = UserIdSchema.parse(userId);
      const { bookId } = IdBookSchema.parse({ bookId: params?.id });

      const book = await this.getBookByIdUseCase.execute({
        bookId,
        userId: id,
      });

      return {
        statusCode: 200,
        body: book,
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
