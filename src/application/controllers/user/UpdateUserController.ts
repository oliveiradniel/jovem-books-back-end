import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { hash } from 'bcrypt';

import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';
import { UpdateUserUseCase } from '../../useCases/user/UpdateUserUseCase';

import { UpdateUserSchema } from '../../schemas/user/UpdateUserSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateUserController implements IController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserById: GetUserByIdUseCase,
  ) {}

  async handle({ body, userId }: IRequest): Promise<IResponse> {
    try {
      const data = UpdateUserSchema.parse({
        userId,
        ...body,
        updatedAt: new Date(),
      });

      let hashedPassword;
      if (data.password) {
        hashedPassword = await hash(data.password!, 10);
      }

      const user = await this.getUserById.execute(data.userId);

      const userData = {
        userId: data.userId ?? user.id,
        username: data.username ?? user.username,
        firstName: data.firstName ?? user.firstName,
        lastName: data.lastName ?? user.lastName,
        email: data.email ?? user.email,
        password: hashedPassword ?? user.password,
        removeImage: data.removeImage,
      };

      await this.updateUserUseCase.execute({
        ...userData,
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
