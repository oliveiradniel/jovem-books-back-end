import { ZodError } from 'zod';

import { UpdateBookUseCase } from '../../useCases/book/UpdateBookUseCase';

import { UpdateBookSchema } from '../schemas/book/UpdateBookSchema';

import { UserNotFound } from '../../errors/user/UserNotFound';
import { BookNotFound } from '../../errors/book/BookNotFound';
import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateBookController implements IController {
  constructor(private readonly updateBookUseCase: UpdateBookUseCase) {}

  async handle({ body, params, userId }: IRequest): Promise<IResponse> {
    try {
      const bookData = {
        id: params?.id,
        userId,
        title: body.title,
        author: body.author,
        sinopse: body.sinopse,
        numberOfPages: body.numberOfPages,
        type: body.type,
        dateOfPublication: body.dateOfPublication,
        updatedAt: new Date(),
      };

      const data = UpdateBookSchema.parse(bookData);

      await this.updateBookUseCase.execute({ id: data.id, data });

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

      if (error instanceof UserNotFound) {
        return {
          statusCode: 404,
          body: { error: 'User not found' },
        };
      }

      if (error instanceof BookNotFound) {
        return {
          statusCode: 404,
          body: { error: 'Book not found' },
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
