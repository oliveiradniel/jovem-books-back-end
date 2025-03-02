import { Read } from '@prisma/client';

import { IUseCase } from '../../interfaces/IUseCase';

import { IReadRepository } from '../../repositories/interfaces/IReadRepository';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';

interface IInput {
  bookId: string;
  userId: string;
}

export class ListReadsUseCase implements IUseCase<IInput, Read[] | void> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookId, userId }: IInput): Promise<Read[] | void> {
    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByIdUseCase.execute({ bookId, userId });

    if (!this.readRepository?.list) {
      return;
    }

    const reads = await this.readRepository.list({ bookId, userId });

    return reads;
  }
}
