import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';

import { GetUserByIdSchema } from '../../schemas/user/GetUserByIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetUserByIdController implements IController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const parsedUserId = GetUserByIdSchema.parse(userId);

      const user = await this.getUserByIdUseCase.execute(parsedUserId);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return verifyUserErrors(error);
    }
  }
}
