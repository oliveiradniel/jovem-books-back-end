import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { DeleteUserUseCase } from '../../useCases/user/DeleteUserUseCase';

import { DeleteUserSchema } from '../../schemas/user/DeleteUserSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const data = DeleteUserSchema.parse(userId);

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
