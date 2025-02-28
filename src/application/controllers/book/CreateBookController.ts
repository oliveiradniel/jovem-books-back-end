import { ZodError } from 'zod';

import { UserNotFound } from '../../errors/user/UserNotFound';

import { CreateBookUseCase } from '../../useCases/book/CreateBookUseCase';

import { CreateBookSchema } from '../schemas/book/CreateBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';
import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

export class CreateBookController implements IController {
  constructor(private readonly createBookUseCase: CreateBookUseCase) {}

  async handle({ body, userId }: IRequest): Promise<IResponse> {
    try {
      const bookData = {
        userId,
        title: body.title,
        author: body.author,
        sinopse: body.sinopse,
        numberOfPages: body.numberOfPages,
        type: body.type,
        dateOfPublication: body.dateOfPublication,
      };

      const data = CreateBookSchema.parse(bookData);

      await this.createBookUseCase.execute({
        data,
      });

      return {
        statusCode: 201,
        body: null,
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

      if (error instanceof TitleAlreadyInUse) {
        return {
          statusCode: 409,
          body: { error: 'Title already in use' },
        };
      }

      throw error;
    }
  }
}
