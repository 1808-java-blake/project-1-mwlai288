import { ReimbRequest } from "./reimburserequest";

export class User {
  id = 0;
  username = "";
  password = "";
  first_name = "";
  last_name = "";
  email = "";
  role = 1;
  reimbursement: ReimbRequest[] = [];
  constructor(
    id?: number,
    username?: string,
    password?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    role?: number,
    reimbursement?: ReimbRequest[]
  ) {
    id && (this.id = id);
    username && (this.username = username);
    password && (this.password = password);
    first_name && (this.first_name = first_name);
    last_name && (this.last_name = last_name);
    email && (this.email = email);
    role && (this.role = role);
    reimbursement && (this.reimbursement = reimbursement);
  }
}
