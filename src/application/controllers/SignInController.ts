import { SignInUseCase } from '../useCases/SignInUseCase';

import { SignInSchema } from './../schemas/user/SignInSchema';

import { IController, IRequest, IResponse } from '../interfaces/IController';
import { verifyUserErrors } from '../../utils/verifyUserErrors';

export class SignInControler implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { username, password } = SignInSchema.parse(body);

      const credentials = { username, password };

      const { accessToken } = await this.signInUseCase.execute(credentials);

      return {
        statusCode: 200,
        body: { accessToken },
      };
    } catch (error) {
      return verifyUserErrors(error);
    }
  }
}
