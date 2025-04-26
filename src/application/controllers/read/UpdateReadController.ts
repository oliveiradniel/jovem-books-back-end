import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { UpdateReadUseCase } from '../../useCases/read/UpdateReadUseCase';

import { UpdateReadSchema } from '../../schemas/read/UpdateReadSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateReadController implements IController {
  constructor(private readonly updateReadUseCase: UpdateReadUseCase) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      let finishedAt: Date | null;
      if (body.status === 'FINISHED') {
        finishedAt = new Date();
      } else {
        finishedAt = null;
      }

      const data = UpdateReadSchema.parse({
        userId,
        bookId: params?.bookId,
        ...body,
        finishedAt,
      });

      const updatedRead = await this.updateReadUseCase.execute(data);

      return {
        statusCode: 200,
        body: updatedRead!,
      };
    } catch (error) {
      return verifyReadErrors(error);
    }
  }
}
