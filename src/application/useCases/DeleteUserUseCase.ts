import { IUseCase } from '../interfaces/IUseCase';
import { prismaClient } from '../lib/prismaClient';
import { GetUserByIdUseCase } from './GetUserByIdUseCase';

export class DeleteUserUseCase implements IUseCase<string, void> {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async execute(id: string) {
    await this.getUserByIdUseCase.execute(id);

    await prismaClient.user.delete({ where: { id } });
  }
}
