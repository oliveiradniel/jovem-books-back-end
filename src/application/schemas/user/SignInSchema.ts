import { BaseUserSchema } from './BaseUserSchema';

export const SignInSchema = BaseUserSchema.omit({
  firstName: true,
  lastName: true,
  email: true,
});
