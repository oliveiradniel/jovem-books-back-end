import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { CreateUserUseCase } from '../../useCases/user/CreateUserUseCase';

import { CreateUserSchema } from '../../schemas/user/CreateUserSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateUserController implements IController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const userData = CreateUserSchema.parse(body);

      await this.createUserUseCase.execute({
        ...userData,
      });

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      return verifyUserErrors(error);
    }
  }
}
