import { SqlReimburseRequest } from "../dto/sql-reimb-req";
import { ReimbRequest } from "../model/reimburserequest";

export function reimburseRequestConverter(
  reimburserequest: SqlReimburseRequest
) {
  return new ReimbRequest(
    reimburserequest.reimb_id,
    reimburserequest.reimb_amount,
    reimburserequest.reimb_submitted,
    reimburserequest.reimb_resolved,
    reimburserequest.reimb_description,
    reimburserequest.reimb_resolver,
    reimburserequest.reimb_author,
    reimburserequest.reimb_status,
    reimburserequest.reimb_type
  );
}
