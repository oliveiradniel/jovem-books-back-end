import { removeFile } from '../../../utils/removeFile';
import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { CreateBookUseCase } from '../../useCases/book/CreateBookUseCase';

import { CreateDataBookSchema } from '../../schemas/book/CreateBookSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';
import { UserIdSchema } from '../../schemas/user/UserIdSchema';

export class CreateBookController implements IController {
  constructor(private readonly createBookUseCase: CreateBookUseCase) {}

  async handle({ userId, body, file }: IRequest): Promise<IResponse> {
    try {
      const parsedUserId = UserIdSchema.parse(userId);

      const data = CreateDataBookSchema.parse({ userId, ...body });
      await this.createBookUseCase.execute({
        userId: parsedUserId,
        data: { ...data, imagePath: file?.filename },
      });

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      await removeFile({ filename: file?.filename });

      return verifyBookErrors(error);
    }
  }
}
