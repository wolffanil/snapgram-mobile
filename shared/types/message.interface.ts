declare type typeMessage = "text" | "image" | "repost" | "answer";

declare interface IMessage extends ITimestamps {
  _id: string;
  sender: IUser;
  content?: string;
  chat: IChat | string;
  imageUrl?: string;
  post?: Pick<
    IPost,
    "_id" | "creator" | "caption" | "imageUrl" | "location" | "createdAt"
  >;
  repostText?: string;
  isRead: boolean;
  type: typeMessage;
}

declare interface IToastMessage {
  sender: IUser;
  currentChat: IChat | undefined;
  setChat: () => void;
}

declare interface IEditMessage extends Pick<IMessage, "chat" | "content"> {}

declare interface ISendMessage
  extends Omit<
    IMessage,
    "_id" | "sender" | "isRead" | "post" | "createdAt" | "updatedAt"
  > {
  post?: string;
}

declare interface IDeleteMessage {
  chatId: string;
}

declare interface IUpdateMessage {
  type: "repost" | "text";
  text: string;
}
