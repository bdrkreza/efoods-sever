import { Document } from "mongoose";

export class CUser {
  id: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  image: string = "";
  role: string = "";
}

export interface IAuthUser extends Document {
  id: string;
  name: string;
  image?: string;
  phone?: string;
  email: string;
  status: string;
  password: string;
  role: string;
}

export interface IAuthDocument extends IAuthUser {
  isValidPassword: (password: string) => Promise<Boolean>;
}
