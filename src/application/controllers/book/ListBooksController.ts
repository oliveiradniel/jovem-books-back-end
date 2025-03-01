import { z } from 'zod';

import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { ListBooksUseCase } from '../../useCases/book/ListBooksUseCase';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListBooksController implements IController {
  constructor(private readonly listBooksUseCase: ListBooksUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const Schema = z
        .string({ message: 'User id must be a string' })
        .uuid('Invalid uuid');

      const data = Schema.parse(userId as string);

      const books = await this.listBooksUseCase.execute({
        userId: data,
        orderBy: params?.orderBy ?? 'asc',
      });

      return {
        statusCode: 200,
        body: { books },
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
