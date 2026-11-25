export interface LoginFormValues {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  identifier?: string;
  password?: string;
}

export interface AuthenticatedUser {
  identifier: string;
  displayName: string;
  loginType: 'correo' | 'usuario';
}
