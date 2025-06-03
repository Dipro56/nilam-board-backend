export interface IUser {
  username: string;
  password: string;
  role: string;
  generateAccessToken: () => string;
}
