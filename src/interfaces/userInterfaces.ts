export interface SignInState {
  email: string;
  password: string;
  error: boolean | string;
  loading: boolean;
  didRedirect: boolean;
}

export interface SignUp {
  name: string;
  lastname: string;
  email: string;
  password: string;
}
export interface SignIn {
  email: string;
  password: string;
}

export interface SignInAPIResponse {
  token: string;
  _id: string;
  name: string;
  email: string;
  role: number;
}

export interface SignUpAPIResponse {
  name: string;
  email: string;
  id: string;
}

export interface SignUpState {
  name: string;
  lastname: string;
  email: string;
  password: string;
  error: string | boolean;
  success: boolean;
}

export interface JWT {
  email: string;
  name: string;
  role: number;
  token: string;
  _id: string;
}

export type IsAuthenticated = JWT | boolean;
