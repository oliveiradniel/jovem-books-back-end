import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { CreateReadUseCase } from '../../useCases/read/CreateReadUseCase';

import { IdsSchema } from '../../schemas/read/IdsSchema';
import { CreateReadSchema } from '../../schemas/read/CreateReadSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateReadController implements IController {
  constructor(private readonly createReadUseCase: CreateReadUseCase) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const { bookId: parsedBookId, userId: parsedUserId } = IdsSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      const data = CreateReadSchema.parse({
        ...body,
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
      console.log(error);
      return verifyReadErrors(error);
    }
  }
}
