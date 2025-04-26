import { SearchParamsGoogleBookSchema } from './SearchParamsGoogleBookSchema';

export const GetGoogleBooksByTitleSchema = SearchParamsGoogleBookSchema.omit({
  author: true,
});

//   startIndex: z.number({ message: 'Start index must be a number' }),
//   maxResults: z.number({ message: 'Max results must be a number' }),
