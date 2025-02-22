import { SignUpUseCase } from '../useCases/SignUpUseCase';

import { IController } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { IResponse } from '../interfaces/IResponse';

export class SignUpController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { username, firstName, lastName, email, password } = request.body;

      if (!username || !firstName || !lastName || !email || !password) {
        throw new Error();
      }
      const user = {
        username,
        firstName,
        lastName,
        email,
        password,
      };

      const signUpUseCase = new SignUpUseCase();

      await signUpUseCase.execute(user);

      return {
        statusCode: 201,
        body: null,
      };
    } catch {
      return {
        statusCode: 400,
        body: null,
      };
    }
  }
}
