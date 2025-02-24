import { prismaClient } from '../lib/prismaClient';
import { GetUserByIdUseCase } from './GetUserByIdUseCase';

export class DeleteUserUseCase {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async execute(id: string) {
    await this.getUserByIdUseCase.execute({ id });

    await prismaClient.user.delete({ where: { id } });
  }
}
