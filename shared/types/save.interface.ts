declare interface ISave extends ITimestamps {
  _id: string;
  postId: IPost | string;
  userId: IUser | string;
  post: IPost;
}
