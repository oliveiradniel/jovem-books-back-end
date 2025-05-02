import { SearchParamsUserSchema } from './SearchParamsUserSchema';

export const GetUserByEmailSchema = SearchParamsUserSchema.omit({
  username: true,
});
