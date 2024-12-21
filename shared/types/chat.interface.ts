declare interface IChat extends ITimestamps {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: IUser[];
  groupAdmin: IUser;
  latestMessage: IMessage;
  background: string;
  unreadMessagesCount: number;
  isTyping?: boolean;
}

declare interface IEditGroup {
  chatId: string;
  users: IUser[];
  background?: string;
  chatName: string;
}
