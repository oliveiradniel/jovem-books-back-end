import { IController, IRequest, IResponse } from '../../interfaces/IController';

import { generateUserAvatarUploadURL } from '../../../server/s3/generateUserAvatarUploadURL';

export class GenerateUserAvatarUploadURLController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    try {
      const mimeType = request.queryParams?.type as string;
      const fileSize = request.queryParams?.size as string;

      const { url, key } = await generateUserAvatarUploadURL(
        mimeType,
        Number(fileSize),
      );

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
