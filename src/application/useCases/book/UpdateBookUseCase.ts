import fs from 'node:fs';

import { IBook } from '../../../@types/IBook';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetBookByIdUseCase } from './GetBookByIdUseCase';
import { GetBookByTitleUseCase } from './GetBookByTitleUseCase';

import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';
import path from 'node:path';

interface IInput {
  bookId: string;
  userId: string;
  data: Partial<
    Pick<
      IBook,
      | 'authors'
      | 'sinopse'
      | 'numberOfPages'
      | 'genreLiterary'
      | 'imagePath'
      | 'title'
    >
  > & { removeImage?: string };
}

export class UpdateBookUseCase implements IUseCase<IInput, IBook | void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getBookByTitleUseCase: GetBookByTitleUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookId, userId, data }: IInput): Promise<IBook | void> {
    const { removeImage } = data;

    await this.getUserByIdUseCase.execute({ userId });

    const book = await this.getBookByIdUseCase.execute({
      bookId,
      userId,
    });

    data = removeImage === 'true' ? { imagePath: null } : data;

    if (data?.title) {
      const bookDataWithTheTitleInUse =
        await this.getBookByTitleUseCase.execute({
          userId,
          title: data.title!,
          shouldReturn: true,
        });

      if (
        bookDataWithTheTitleInUse &&
        bookDataWithTheTitleInUse.id !== bookId
      ) {
        throw new TitleAlreadyInUse();
      }
    }

    if (!this.bookRepository?.update) {
      return;
    }

    if (removeImage === 'true' && book.imagePath) {
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'uploads',
        'books',
        book.imagePath,
      );

      fs.access(filePath, fs.constants.F_OK, err => {
        if (err) {
          console.error('Arquivo não encontrado:', err);
          return;
        }

        fs.unlink(filePath, err => {
          if (err) {
            console.error('Erro ao apagar o arquivo:', err);
          } else {
            console.log('Arquivo apagado com sucesso');
          }
        });
      });
    }

    return await this.bookRepository.update({
      bookId,
      userId,
      data,
    });
  }
}
