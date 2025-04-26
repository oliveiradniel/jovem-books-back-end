import { IRead } from '../../../@types/IRead';

import { GetReadByBookIdUseCase } from './GetReadByBookIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IReadRepository,
  TCreateRead,
} from '../../repositories/interfaces/IReadRepository';

export class CreateReadUseCase implements IUseCase<TCreateRead, IRead> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getReadByIdUseCase: GetReadByBookIdUseCase,
  ) {}

  async execute({ bookId, userId, ...data }: TCreateRead): Promise<IRead> {
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
