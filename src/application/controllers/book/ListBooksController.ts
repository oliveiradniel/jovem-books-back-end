import { z, ZodError } from 'zod';

import { ListBooksUseCase } from '../../useCases/book/ListBooksUseCase';

import { UserNotFound } from '../../errors/user/UserNotFound';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListBooksController implements IController {
  constructor(private readonly listBooksUseCase: ListBooksUseCase) {}

  async handle({ params, ...data }: IRequest): Promise<IResponse> {
    try {
      const Schema = z
        .string({ message: 'User id must be a string' })
        .uuid('Invalid uuid');

      const userId = Schema.parse(data.userId);

      const { books } = await this.listBooksUseCase.execute({
        userId,
        orderBy: params?.orderBy ?? 'asc',
      });

      return {
        statusCode: 201,
        body: { books },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: error.errors[0].message },
        };
      }

      if (error instanceof UserNotFound) {
        return {
          statusCode: 404,
          body: { error: 'User not found' },
        };
      }

      throw error;
    }
  }
}
