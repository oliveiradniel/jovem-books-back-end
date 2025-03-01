import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { hash } from 'bcrypt';

import { UpdateUserUseCase } from '../../useCases/user/UpdateUserUseCase';

import { UserIdSchema } from '../../schemas/user/UserIdSchema';
import { UpdateUserSchema } from '../../schemas/user/UpdateUserSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateUserController implements IController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handle({ body, userId: id }: IRequest): Promise<IResponse> {
    try {
      const userId = UserIdSchema.parse(id);

      const data = UpdateUserSchema.parse({
        ...body,
        updatedAt: new Date(),
      });

      let hashedPassword = data.password;
      if (data.password) {
        hashedPassword = await hash(data.password!, 10);
      }

      await this.updateUserUseCase.execute({
        userId,
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyUserErrors(error);
    }
  }
}
