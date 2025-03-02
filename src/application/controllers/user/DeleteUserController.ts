import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { DeleteUserUseCase } from '../../useCases/user/DeleteUserUseCase';

import { UserIdSchema } from '../../schemas/user/UserIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const parsedUserId = UserIdSchema.parse(userId);

      await this.deleteUserUseCase.execute({ userId: parsedUserId });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyUserErrors(error);
    }
  }
}
