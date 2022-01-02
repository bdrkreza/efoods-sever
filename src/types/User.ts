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
