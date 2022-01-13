import { NextFunction as Next, Request as Req, Response as Res } from "express";
import { Role } from "./Role";

export type TUser = {
  id: string;
  name: string;
  email: string;
  imageURL?: string;
  password: string;
  role: Role;
  carts: string[];
};

/**
 * Custom User interface used in combination with Express Request / Response types
 */
interface IUser {
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

/**
 * Combine Express types with customer User interface
 */
export type Request = Req & IUser;
export type Response = Res & IUser;
export type NextFunction = Next;
