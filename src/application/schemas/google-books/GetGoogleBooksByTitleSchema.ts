import { SearchParamsGoogleBookSchema } from './SearchParamsGoogleBookSchema';

export const GetGoogleBooksByTitleSchema = SearchParamsGoogleBookSchema.omit({
  author: true,
});
