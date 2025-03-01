import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { hash } from 'bcrypt';

import { UpdateUserUseCase } from '../../useCases/user/UpdateUserUseCase';

import { UpdateUserSchema } from '../../schemas/user/UpdateUserSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateUserController implements IController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

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

      let hashedPassword = data.password;
      if (data.password) {
        hashedPassword = await hash(data.password!, 10);
      }

      await this.updateUserUseCase.execute({
        ...data,
        password: hashedPassword,
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
