import { Document } from "mongoose";

export class CUser {
  id: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  imageURL: string = "";
  role: string = "";
}

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  imageURL: string;
  role: string;
}

export interface IUserDocument extends IUser {
  matchesPassword: (password: string) => Promise<Boolean>;
}
