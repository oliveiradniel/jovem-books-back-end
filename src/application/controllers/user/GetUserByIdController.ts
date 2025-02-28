import { z } from 'zod';

import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetUserByIdController implements IController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const Schema = z
        .string({ message: 'Id must be a string' })
        .uuid({ message: 'Invalid uuid' });

      const data = Schema.parse(userId);

      const user = await this.getUserByIdUseCase.execute(data);

      return {
        statusCode: 201,
        body: { user },
      };
    } catch (error) {
      return verifyUserErrors(error);
    }
  }
}
