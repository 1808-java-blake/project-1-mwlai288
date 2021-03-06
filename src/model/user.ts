import { ReimbRequest } from "./reimburserequest";

export class User {
  id = 0;
  username = "";
  password = "";
  first_name = "";
  last_name = "";
  email = "";
  roleId = 0;
  role = "";
  reimbursement: ReimbRequest[] = [];
  constructor(
    id?: number,
    username?: string,
    password?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    roleId?: number,
    role?: string,
    reimbursement?: ReimbRequest[]
  ) {
    id && (this.id = id);
    username && (this.username = username);
    password && (this.password = password);
    first_name && (this.first_name = first_name);
    last_name && (this.last_name = last_name);
    email && (this.email = email);
    roleId && (this.roleId = roleId);
    role && (this.role = role);
    reimbursement && (this.reimbursement = reimbursement);
  }
}
