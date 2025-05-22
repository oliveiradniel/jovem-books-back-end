import { verifyUserErrors } from '../../utils/verifyUserErrors';

import { SignInUseCase } from '../useCases/user/SignInUseCase';

import { SignInSchema } from './../schemas/user/SignInSchema';

import { IController, IRequest, IResponse } from '../interfaces/IController';

export class SignInControler implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const data = SignInSchema.parse(body);

      const { accessToken } = await this.signInUseCase.execute(data);

      return {
        statusCode: 200,
        body: { accessToken },
      };
    } catch (error) {
      return verifyUserErrors(error);
    }
  }
}
