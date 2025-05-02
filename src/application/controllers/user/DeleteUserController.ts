import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { DeleteUserUseCase } from '../../useCases/user/DeleteUserUseCase';

import { IdUserSchema } from '../../schemas/user/IdUserSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const parsedUserId = IdUserSchema.parse(userId);

      await this.deleteUserUseCase.execute(parsedUserId);

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyUserErrors(error);
    }
  }
}
