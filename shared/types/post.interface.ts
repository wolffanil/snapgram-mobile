declare interface IPost extends ITimestamps {
  _id: string;
  creator: IUser;
  caption: string;
  countRepost: number;
  tags: string[];
  location: string;
  imageUrl: string;
  likes: ILike[];
  saves: ISave[];
  comments: IComment[];
  commentsCount: number;
}

declare interface IEditPost
  extends Omit<IPost, "_id" | "tags" | "likes" | "saves" | "comments"> {
  tags: string | string[];
  file: File[];
}

declare interface IGetPosts {
  posts: IPost[];

  // hasMore: boolean;
  page: number;
}

declare interface IInfinityPosts {
  pages: {
    posts: IPost[];
    page: number;
  }[];
}
