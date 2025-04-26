export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imagePath: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
