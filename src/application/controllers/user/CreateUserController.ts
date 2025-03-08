import { removeFile } from '../../../utils/removeFile';
import { verifyUserErrors } from '../../../utils/verifyUserErrors';

import { CreateUserUseCase } from '../../useCases/user/CreateUserUseCase';

import { CreateUserSchema } from '../../schemas/user/CreateUserSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateUserController implements IController {
  constructor(private readonly createUserUpUseCase: CreateUserUseCase) {}

  async handle({ body, file }: IRequest): Promise<IResponse> {
    try {
      const data = CreateUserSchema.parse(body);

      await this.createUserUpUseCase.execute({
        ...data,
        imagePath: file?.filename ?? null,
      });

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      await removeFile({ filename: file?.filename });

      return verifyUserErrors(error);
    }
  }
}
