declare interface IComment extends ITimestamps {
  _id: string;
  postId?: IPost | string;
  author: IUser;
  parentId?: IComment | string;
  text: string;
  likes: ILike[];
}

declare interface IEditComment
  extends Pick<IComment, "postId" | "parentId" | "text"> {}
