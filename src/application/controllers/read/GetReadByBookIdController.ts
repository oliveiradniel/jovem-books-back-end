import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { GetReadByBookIdUseCase } from '../../useCases/read/GetReadByBookIdUseCase';

import { GetReadByBookIdSchema } from '../../schemas/read';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetReadByBookIdController implements IController {
  constructor(
    private readonly getReadByBookIdUseCase: GetReadByBookIdUseCase,
  ) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const { userId: id, bookId } = GetReadByBookIdSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      const read = await this.getReadByBookIdUseCase.execute({
        userId: id,
        bookId,
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
