import { SearchParamsUserSchema } from './SearchParamsUserSchema';

export const GetUserByUsernameSchema = SearchParamsUserSchema.omit({
  email: true,
});
