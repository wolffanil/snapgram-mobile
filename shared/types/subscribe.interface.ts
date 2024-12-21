declare interface ISubscribe {
  subscriberId: Pick<IUser, "_id" | "imageUrl" | "name">;
  userId: Pick<IUser, "_id" | "imageUrl" | "name">;
}
