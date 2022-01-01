import { Role } from "./Role";

export type User = {
  id: string;
  name: string;
  email: string;
  imageURL?: string;
  password: string;
  role: Role;
  carts: string[];
};
