import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IReadRepository,
  TDeleteRead,
} from '../../repositories/interfaces/IReadRepository';

export class DeleteReadUseCase implements IUseCase<TDeleteRead, void> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
  ) {}

  async execute({ bookId, userId }: TDeleteRead): Promise<void> {
    await this.getBookByIdUseCase.execute({ bookId, userId });

    await this.readRepository.delete({ bookId });
  }
}
