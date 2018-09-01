export class ReimbRequest {
  id = 0;
  amount = 0;
  submitted = "";
  resolved = "";
  description = "";
  author = 0;
  resolverId = 0;
  statusId = 0;
  typeId = 0;

  constructor(
    id?: number,
    amount?: number,
    submitted?: string,
    resolved?: string,
    description?: string,
    resolver?: number,
    author?: number,
    status?: number,
    type?: number
  ) {
    id && (this.id = id);
    amount && (this.amount = amount);
    submitted && (this.submitted = submitted);
    resolved && (this.resolved = resolved);
    description && (this.description = description);
    author && (this.author = author);
    resolver && (this.resolverId = resolver);
    status && (this.statusId = status);
    type && (this.typeId = type);
  }
}
