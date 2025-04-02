import { IRead } from '../../../@types/IRead';

import { GetReadByBookIdUseCase } from './GetReadByBookIdUseCase';
import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IReadRepository } from '../../repositories/interfaces/IReadRepository';

type DataToUpdateRead = Omit<
  Partial<IRead>,
  'bookId' | 'createdAt' | 'finishedAt'
>;

interface IInput {
  bookId: string;
  userId: string;
  data: DataToUpdateRead;
}

export class UpdateReadUseCase implements IUseCase<IInput, IRead | void> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getReadByBookIdUseCase: GetReadByBookIdUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookId, userId, data }: IInput): Promise<IRead | void> {
    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByIdUseCase.execute({ userId, bookId });

    await this.getReadByBookIdUseCase.execute({ bookId, userId });

    if (!this.readRepository?.update) {
      return;
    }

    return (await this.readRepository.update({ bookId, data })) as IRead;
  }
}
