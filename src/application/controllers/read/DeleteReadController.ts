import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { DeleteReadUseCase } from '../../useCases/read/DeleteReadUseCase';

import { IdsSchema } from '../../schemas/read/IdsSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteReadController implements IController {
  constructor(private readonly deleteReadUseCase: DeleteReadUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const { bookId: parsedBookId, userId: parsedUserId } = IdsSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      await this.deleteReadUseCase.execute({
        bookId: parsedBookId,
        userId: parsedUserId,
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
