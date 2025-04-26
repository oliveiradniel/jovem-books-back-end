import { SearchParamsBookSchema } from './SearchParamsBookSchema';

export const GetBookByAuthorSchema = SearchParamsBookSchema.omit({
  title: true,
});
