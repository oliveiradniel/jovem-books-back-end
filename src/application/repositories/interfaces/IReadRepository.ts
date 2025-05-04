/* eslint-disable @typescript-eslint/no-empty-object-type */

import { z } from 'zod';

import { TRead } from '../../../@types/Read';

import { IRepository } from '../../interfaces/IRepository';

import {
  ListReadsSchema,
  GetReadByBookIdSchema,
  CreateReadSchema,
  UpdateReadSchema,
  DeleteReadSchema,
} from '../../schemas/read';

export type TListReads = z.infer<typeof ListReadsSchema>;

export type TGetReadByBookId = z.infer<typeof GetReadByBookIdSchema>;

export type TCreateRead = z.infer<typeof CreateReadSchema>;

export type TUpdateRead = z.infer<typeof UpdateReadSchema>;

export type TDeleteRead = z.infer<typeof DeleteReadSchema>;

export interface IReadRepository
  extends IRepository<
    TRead,
    Omit<TGetReadByBookId, 'userId'>,
    Omit<TCreateRead, 'userId'>,
    Omit<TDeleteRead, 'userId'>,
    TListReads,
    Omit<TUpdateRead, 'userId'>
  > {}
