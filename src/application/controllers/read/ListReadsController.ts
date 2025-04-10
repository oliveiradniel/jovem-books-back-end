import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { ListReadsUseCase } from '../../useCases/read/ListReadsUseCase';

import { UserIdSchema } from '../../schemas/user/UserIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListReadsController implements IController {
  constructor(private readonly listReadsUseCase: ListReadsUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const id = UserIdSchema.parse(userId);

      const reads = await this.listReadsUseCase.execute({ userId: id });

      return {
        statusCode: 200,
        body: reads,
      };
    } catch (error) {
      return verifyReadErrors(error);
    }
  }
}
