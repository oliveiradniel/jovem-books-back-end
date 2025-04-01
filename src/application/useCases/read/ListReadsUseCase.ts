import { IRead } from '../../../@types/IRead';

import { IUseCase } from '../../interfaces/IUseCase';

import { ReadRepository } from '../../repositories/ReadRepository';

interface IInput {
  userId: string;
}

export class ListReadsUseCase implements IUseCase<IInput, IRead[]> {
  constructor(private readonly readRepository: ReadRepository) {}

  async execute({ userId }: IInput): Promise<IRead[]> {
    const reads = await this.readRepository.list({ userId });

    return reads;
  }
}
