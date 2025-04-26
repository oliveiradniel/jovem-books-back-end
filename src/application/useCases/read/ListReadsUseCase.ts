import { IRead } from '../../../@types/IRead';

import { IUseCase } from '../../interfaces/IUseCase';
import { TListReads } from '../../repositories/interfaces/IReadRepository';

import { ReadRepository } from '../../repositories/ReadRepository';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

export class ListReadsUseCase implements IUseCase<TListReads, IRead[]> {
  constructor(
    private readonly readRepository: ReadRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId }: TListReads): Promise<IRead[]> {
    await this.getUserByIdUseCase.execute({ userId });

    const reads = await this.readRepository.list({ userId });

    return reads;
  }
}
