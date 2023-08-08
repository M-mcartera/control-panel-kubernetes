import { Resource } from "./CreateRoleComponent";

export type Role = {
  _id: string;
  roleName: string;
  index: number;
  roleDescription: string;
  resources: Resource[];
  usersInRole: string[];
  createdAt: Date;
};
