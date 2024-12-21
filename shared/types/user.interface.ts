declare interface IUser extends ITimestamps {
  _id: string;
  name: string;
  nick?: string;
  email: string;
  imageUrl: string;
  bio?: string;
  isOnline: boolean;
}

declare interface IEditUser
  extends Pick<IUser, "name" | "nick" | "bio" | "imageUrl" | "email"> {
  file: File[];
}

declare interface IUserAndPosts extends IUser {
  posts: IPost[];
}

declare interface IUpdatePassword {
  passwordCurrent: string;
  newPassword: string;
  sessionId: string;
}
