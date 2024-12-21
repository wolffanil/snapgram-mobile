declare interface ITokens {
  accessToken: string;
  refreshToken: string;
}

declare interface IAuthResponse extends ITokens {
  userData: IUser;
  session: {
    id: string;
  };
}

declare interface IRegister extends Pick<IUser, "name" | "email"> {
  password: string;
  code?: string;
  token: string;
}

declare interface ILogin extends Pick<IUser, "email"> {
  password: string;
  code?: string;
  token: string;
}

declare interface IResetCode extends Pick<IUser, "email"> {
  password: string;
}

declare interface IResetPassword {
  code: string;
  newPassword: string;
}

declare interface IResetPasswordForm extends IResetPassword {
  email: string;
  confirmNewPassword: string;
}

declare interface IForgotPassword extends Pick<IUser, "email"> {}

declare interface IResResetPassword {
  message: string;
  userId: string;
}

declare interface IQrToken {
  token: string;
}
