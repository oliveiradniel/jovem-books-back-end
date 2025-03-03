import { Read } from '@prisma/client';

import { ZodError } from 'zod';

import { ListReadsUseCase } from '../../useCases/read/ListReadsUseCase';

import { UserIdSchema } from '../../schemas/user/UserIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListReadsController implements IController {
  constructor(private readonly listReadsUseCase: ListReadsUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const parsedUserId = UserIdSchema.parse(userId);

      const reads = await this.listReadsUseCase.execute({
        userId: parsedUserId,
      });

      return {
        statusCode: 200,
        body: reads as Read[],
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: error.errors[0].message },
        };
      }

      return {
        statusCode: 500,
        body: { error: 'Internal Server Error' },
      };
    }
  }
}
