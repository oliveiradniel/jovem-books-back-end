import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { UpdateReadUseCase } from '../../useCases/read/UpdateReadUseCase';

import { UpdateReadSchema } from '../../schemas/read/UpdateReadSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';
import { UserIdSchema } from '../../schemas/user/UserIdSchema';
import { BookIdSchema } from '../../schemas/book/BookIdSchema';

export class UpdateReadController implements IController {
  constructor(private readonly updateReadUseCase: UpdateReadUseCase) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const id = UserIdSchema.parse(userId);
      const bookId = BookIdSchema.parse(params?.bookId);

      let finishedAt: Date | null;
      if (body.status === 'FINISHED') {
        finishedAt = new Date();
      } else {
        finishedAt = null;
      }

      const data = UpdateReadSchema.parse({
        ...body,
        finishedAt,
      });

      await this.updateReadUseCase.execute({
        bookId,
        userId: id,
        data,
      });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyReadErrors(error);
    }
  }
}
