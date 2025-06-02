import { GetUserByIdUseCase } from './GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IUserRepository,
  TDeleteUser,
} from '../../repositories/interfaces/IUserRepository';
import { DeleteObjectUseCase } from '../s3/DeleteObjectUseCase';

export class DeleteUserUseCase implements IUseCase<TDeleteUser, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly deleteObjectUseCase: DeleteObjectUseCase,
  ) {}

  async execute(userId: TDeleteUser) {
    const user = await this.getUserByIdUseCase.execute(userId);

    await this.userRepository.delete(userId);

    if (user.imagePath) {
      await this.deleteObjectUseCase.execute({ key: user.imagePath });
    }
  }
}
