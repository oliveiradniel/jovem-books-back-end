import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IReadRepository } from '../../repositories/interfaces/IReadRepository';

interface IInput {
  bookId: string;
  userId: string;
}

export class DeleteReadUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookId, userId }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByIdUseCase.execute({ bookId, userId });

    await this.readRepository.delete({ bookId });
  }
}
