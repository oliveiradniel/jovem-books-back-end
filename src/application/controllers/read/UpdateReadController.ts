import { ZodError } from 'zod';

import { UpdateReadUseCase } from '../../useCases/read/UpdateReadUseCase';

import { IdsSchema } from '../../schemas/read/IdsSchema';
import { UpdateDataReadSchema } from '../../schemas/read/UpdateDataReadSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';
import { ReadingNotFound } from '../../errors/read/ReadingNotFound';

export class UpdateReadController implements IController {
  constructor(private readonly updateReadUseCase: UpdateReadUseCase) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const { bookId: parsedBookId, userId: parsedUserId } = IdsSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      const data = UpdateDataReadSchema.parse({
        ...body,
        updatedAt: new Date(),
      });

      const isEmptyData = Object.keys(data).length === 1;

      if (isEmptyData) {
        return {
          statusCode: 204,
          body: null,
        };
      }

      await this.updateReadUseCase.execute({
        bookId: parsedBookId,
        userId: parsedUserId,
        data,
      });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: error.errors[0].message },
        };
      }

      if (error instanceof ReadingNotFound) {
        return {
          statusCode: 404,
          body: { error: error.message },
        };
      }
      console.log(error);
      return {
        statusCode: 500,
        body: { error: 'Internal Server Error' },
      };
    }
  }
}
