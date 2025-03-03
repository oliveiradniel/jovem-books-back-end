import { Read } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IReadRepository } from '../../repositories/interfaces/IReadRepository';

interface IInput {
  userId: string;
}

export class ListReadsUseCase implements IUseCase<IInput, Read[] | void> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId }: IInput): Promise<Read[] | void> {
    await this.getUserByIdUseCase.execute({ userId });

    if (!this.readRepository?.list) {
      return;
    }

    const reads = await this.readRepository.list({ userId });

    return reads;
  }
}
