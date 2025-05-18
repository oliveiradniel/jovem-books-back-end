import { TRead } from '../../../@types/Read';

import { GetReadByBookIdUseCase } from './GetReadByBookIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IReadRepository,
  TCreateRead,
} from '../../repositories/interfaces/IReadRepository';

export class CreateReadUseCase implements IUseCase<TCreateRead, TRead> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getReadByIdUseCase: GetReadByBookIdUseCase,
  ) {}

  async execute({ bookId, userId, ...data }: TCreateRead): Promise<TRead> {
    await this.getReadByIdUseCase.execute({
      bookId,
      userId,
    });

    return await this.readRepository.create({
      bookId,
      ...data,
    });
  }
}
