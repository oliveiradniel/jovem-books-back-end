import { SearchParamsGoogleBookSchema } from './SearchParamsGoogleBookSchema';

export const GetGoogleBooksByAuthorSchema = SearchParamsGoogleBookSchema.omit({
  title: true,
});

// startIndex: z.number({ message: 'Start index must be a number' }),
// maxResults: z.number({ message: 'Max results must be a number' }),
