import { GetUserByIdUseCase } from './GetUserByIdUseCase';
import { ListBooksUseCase } from '../book/ListBooksUseCase';
import { DeleteObjectUseCase } from '../s3/DeleteObjectUseCase';
import { DeleteObjectsUseCase } from '../s3/DeleteObjectsUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IUserRepository,
  TDeleteUser,
} from '../../repositories/interfaces/IUserRepository';

export class DeleteUserUseCase implements IUseCase<TDeleteUser, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly listBooksUseCase: ListBooksUseCase,
    private readonly deleteObjectUseCase: DeleteObjectUseCase,
    private readonly deleteObjectsUseCase: DeleteObjectsUseCase,
  ) {}

  async execute(userId: TDeleteUser) {
    const user = await this.getUserByIdUseCase.execute(userId);

    const imagePath = user.imagePath;

    const books = await this.listBooksUseCase.execute({
      userId,
      orderBy: 'asc',
    });

    const keys = books
      .map(book => book.imagePath)
      .filter((key): key is string => !!key)
      .map(key => ({ Key: key }));

    await this.userRepository.delete(userId);

    if (imagePath) {
      await this.deleteObjectUseCase.execute({ key: imagePath });
    }

    if (keys.length > 0) {
      await this.deleteObjectsUseCase.execute({ keys });
    }
  }
}
