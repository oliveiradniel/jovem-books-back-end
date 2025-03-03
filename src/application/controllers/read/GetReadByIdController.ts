import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { GetReadByIdUseCase } from '../../useCases/read/GetReadByBookIdUseCase';

import { IdsSchema } from '../../schemas/read/IdsSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetReadByIdController implements IController {
  constructor(private readonly getReadByIdUseCase: GetReadByIdUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const { bookId: parsedBookId, userId: parsedUserId } = IdsSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      const read = await this.getReadByIdUseCase.execute({
        bookId: parsedBookId,
        userId: parsedUserId,
      });

      return {
        statusCode: 201,
        body: read,
      };
    } catch (error) {
      return verifyReadErrors(error);
    }
  }
}
