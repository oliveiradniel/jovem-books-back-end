import { TRead } from '../../../@types/Read';

import { GetReadByBookIdUseCase } from './GetReadByBookIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IReadRepository,
  TUpdateRead,
} from '../../repositories/interfaces/IReadRepository';

export class UpdateReadUseCase implements IUseCase<TUpdateRead, TRead | null> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getReadByBookIdUseCase: GetReadByBookIdUseCase,
  ) {}

  async execute({
    userId,
    bookId,
    ...data
  }: TUpdateRead): Promise<TRead | null> {
    await this.getReadByBookIdUseCase.execute({ bookId, userId });

    if (!this.readRepository?.update) {
      return null;
    }

    return await this.readRepository.update({ bookId, ...data });
  }
}
