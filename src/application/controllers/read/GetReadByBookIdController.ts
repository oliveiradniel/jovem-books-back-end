import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { GetReadByBookIdUseCase } from '../../useCases/read/GetReadByBookIdUseCase';

import { UserIdSchema } from '../../schemas/user/UserIdSchema';
import { BookIdSchema } from '../../schemas/book/BookIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetReadByBookIdController implements IController {
  constructor(
    private readonly getReadByBookIdUseCase: GetReadByBookIdUseCase,
  ) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const id = UserIdSchema.parse(userId);

      const bookId = BookIdSchema.parse(params?.bookId);

      const read = await this.getReadByBookIdUseCase.execute({
        bookId,
        userId: id,
      });

      return {
        statusCode: 200,
        body: read,
      };
    } catch (error) {
      return verifyReadErrors(error);
    }
  }
}
