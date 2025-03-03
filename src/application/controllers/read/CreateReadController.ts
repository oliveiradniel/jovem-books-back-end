import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { CreateReadUseCase } from '../../useCases/read/CreateReadUseCase';

import { IdsSchema } from '../../schemas/read/IdsSchema';
import { CreateDataReadSchema } from '../../schemas/read/CreateDataReadSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateReadController implements IController {
  constructor(private readonly createReadUseCase: CreateReadUseCase) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const { bookId: parsedBookId, userId: parsedUserId } = IdsSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      const data = CreateDataReadSchema.parse({
        ...body,
        status: 'NOT_READING',
      });

      await this.createReadUseCase.execute({
        bookId: parsedBookId,
        userId: parsedUserId,
        data,
      });

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      return verifyReadErrors(error);
    }
  }
}
