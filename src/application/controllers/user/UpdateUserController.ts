import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { hash } from 'bcrypt';

import { UpdateUserUseCase } from '../../useCases/user/UpdateUserUseCase';
import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';

import { UpdateUserSchema } from '../schemas/user/UpdateUserSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateUserController implements IController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async handle({ body, userId }: IRequest): Promise<IResponse> {
    try {
      const userData = {
        id: userId,
        username: body.username,
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
        updatedAt: new Date(),
      };

      const data = UpdateUserSchema.parse(userData);

      const user = await this.getUserByIdUseCase.execute(data.id);

      let hashedPassword = data.password;
      if (data.password) {
        hashedPassword = await hash(data.password!, 10);
      }

      await this.updateUserUseCase.execute({
        id: data.id,
        data: {
          username: data.username ?? user.username,
          email: data.email ?? user.email,
          password: hashedPassword ?? user.password,
          firstName: data.firstName ?? user.firstName,
          lastName: data.lastName ?? user.lastName,
          updatedAt: new Date(),
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
