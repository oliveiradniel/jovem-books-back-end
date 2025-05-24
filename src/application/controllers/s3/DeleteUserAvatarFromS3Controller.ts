import { IController, IRequest, IResponse } from '../../interfaces/IController';

import { deleteObject } from '../../../server/s3/deleteObject';

export class DeleteUserAvatarFromS3Controller implements IController {
  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      const key = params?.key as string;

      await deleteObject(key);

      return {
        statusCode: 204,
        body: null,
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
