import { verifyReadErrors } from '../../../utils/verfiyReadErrors';

import { CreateReadUseCase } from '../../useCases/read/CreateReadUseCase';

import { CreateReadSchema } from '../../schemas/read/CreateReadSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateReadController implements IController {
  constructor(private readonly createReadUseCase: CreateReadUseCase) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const data = CreateReadSchema.parse({
        userId,
        bookId: params?.bookId,
        ...body,
      });

      const createdRead = await this.createReadUseCase.execute(data);

      return {
        statusCode: 201,
        body: createdRead,
      };
    } catch (error) {
      return verifyReadErrors(error);
    }
  }
}
