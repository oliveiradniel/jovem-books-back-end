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

  async handle({ userId, body, file }: IRequest): Promise<IResponse> {
    try {
      let hashedPassword;
      if (body.password) {
        hashedPassword = await hash(body.password!, 10);
      }

      const user = await this.getUserById.execute(userId);

      const userData = {
        userId: body.userId ?? user.id,
        username: body.username ?? user.username,
        firstName: body.firstName ?? user.firstName,
        lastName: body.lastName ?? user.lastName,
        email: body.email ?? user.email,
        password: hashedPassword ?? user.password,
        imagePath: body.removeImage ? null : file?.filename ?? user.imagePath,
        removeImage:
          (body.removeImage && JSON.parse(body.removeImage)) ?? false,
      };

      const data = UpdateUserSchema.parse({
        ...userData,
        updatedAt: new Date(),
      });

      const updatedBook = await this.updateUserUseCase.execute({
        ...data,
      });

      return {
        statusCode: 200,
        body: updatedBook,
      };
    } catch (error) {
      console.log(error);
      return verifyUserErrors(error);
    }
  }
}
