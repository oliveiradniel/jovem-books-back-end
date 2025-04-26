import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { CreateReadUseCase } from '../../useCases/read/CreateReadUseCase';

import { CreateReadSchema } from '../../schemas/read/CreateReadSchema';
import { UserIdSchema } from '../../schemas/user/UserIdSchema';
import { IdBookSchema } from '../../schemas/book/IdBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateReadController implements IController {
  constructor(private readonly createReadUseCase: CreateReadUseCase) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const id = UserIdSchema.parse(userId);
      const { bookId } = IdBookSchema.parse({ bookId: params?.bookId });

      const data = CreateReadSchema.parse({
        ...body,
      });

      const createdRead = await this.createReadUseCase.execute({
        bookId,
        userId: id,
        data,
      });

      return {
        statusCode: 201,
        body: createdRead,
      };
    } catch (error) {
      return verifyReadErrors(error);
    }
  }
}
