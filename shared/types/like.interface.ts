declare interface ILike extends ITimestamps {
  _id: string;
  userId: IUser;
  postId?: IPost;
  commentId: IComment | string;
}
