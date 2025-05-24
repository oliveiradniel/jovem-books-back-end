import { IController, IRequest, IResponse } from '../../interfaces/IController';

import { GeneratePresignedURLUseCase } from '../../useCases/s3/GeneratePresignedURLUseCase';

import { GeneratePreSignedURLSchema } from '../../schemas/s3/GeneratePreSignedURLSchema';

export class GenerateUserAvatarUploadURLController implements IController {
  constructor(
    private readonly generatePresignedURLUseCase: GeneratePresignedURLUseCase,
  ) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { mimeType } = GeneratePreSignedURLSchema.parse({
        mimeType: request.queryParams?.type,
        fileSize: Number(request.queryParams?.size),
      });

      const { url, key } = await this.generatePresignedURLUseCase.execute({
        folder: 'user-avatar',
        mimeType,
      });

      return {
        statusCode: 200,
        body: { url, key },
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: 400,
        body: null,
      };
    }
  }
}
