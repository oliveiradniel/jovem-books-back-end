import fs from 'node:fs';
import path from 'node:path';

import { IBook } from '../../../@types/IBook';

import { GetBookByIdUseCase } from './GetBookByIdUseCase';
import { GetBookByTitleUseCase } from './GetBookByTitleUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

import {
  IBookRepository,
  TUpdateBook,
} from '../../repositories/interfaces/IBookRepository';

export class UpdateBookUseCase implements IUseCase<TUpdateBook, IBook | null> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getBookByTitleUseCase: GetBookByTitleUseCase,
  ) {}

  async execute({
    bookId,
    userId,
    removeImage,
    ...data
  }: TUpdateBook): Promise<IBook | null> {
    const book = await this.getBookByIdUseCase.execute({
      bookId,
      userId,
    });

    if (data.title) {
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
      return null;
    }

    if (removeImage && book.imagePath) {
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

    return await this.bookRepository.update({ userId, bookId, ...data });
  }
}
