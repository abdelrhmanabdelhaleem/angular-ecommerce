export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface IUser {
  name: string;
  email: string;
}
export interface IAuthResponse {
  message: string;
  token: string;
  user: IUser;
}
export interface IUserDecodedToken {
  exp: number;
  iat: number;
  id: string;
  name: string;
  role: 'user' | 'admin';
}
