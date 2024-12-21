declare interface IToken extends ITimestamps {
  _id: string;
  userId: string;
  browser: string;
  device: string;
  brand: string;
  model: string;
  type: typeDevice;
  ip: string;
}

declare type typeDevice = "browser" | "mobile";
