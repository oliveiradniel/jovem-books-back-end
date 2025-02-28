import { z } from 'zod';

import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { DeleteUserUseCase } from '../../useCases/user/DeleteUserUseCase';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const Schema = z
        .string({ message: 'Id must be a string' })
        .uuid({ message: 'Invalid uuid' });

      const data = Schema.parse(userId);

      await this.deleteUserUseCase.execute(data);

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyUserErrors(error);
    }
  }
}
