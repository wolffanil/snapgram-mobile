declare type type = "like" | "save" | "comment" | "repost";

declare interface INotification extends ITimestamps {
  postId: IPost;
  to: string;
  user: IUser;
  type: type;
  isView: boolean;
}

declare interface ICreateNotificaion
  extends Omit<INotification, "isView" | "createdAt" | "updatedAt" | "user"> {
  user: {
    _id: string;
    name: string;
  };
}

declare interface IDeleteNotification {
  type: type;
  postId: string;
  to: string;
}
