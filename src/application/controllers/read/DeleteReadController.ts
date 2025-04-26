import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { DeleteReadUseCase } from '../../useCases/read/DeleteReadUseCase';

import { DeleteReadSchema } from '../../schemas/read';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteReadController implements IController {
  constructor(private readonly deleteReadUseCase: DeleteReadUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const { userId: id, bookId } = DeleteReadSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      await this.deleteReadUseCase.execute({
        userId: id,
        bookId,
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
