import { hash } from 'bcrypt';

import { UsernameAlreadyInUse } from '../../errors/user/UsernameAlreadyInUse';
import { EmailAlreadyInUse } from '../../errors/user/EmailAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class CreateUserUseCase implements IUseCase<IInput, void> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ username, firstName, lastName, email, password }: IInput) {
    const isUsernameInUse = await this.userRepository.findByUsername(username);

    if (isUsernameInUse) throw new UsernameAlreadyInUse();

    const isEmailInUse = await this.userRepository.findByEmail(email);

    if (isEmailInUse) throw new EmailAlreadyInUse();

    const hashedPassword = await hash(password, 10);

    await this.userRepository.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  }
}
