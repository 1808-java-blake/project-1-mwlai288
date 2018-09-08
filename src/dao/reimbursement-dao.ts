import { connectionPool } from "../util/connection.util";
import { ReimbRequest } from "../model/reimburserequest";
import { reimburseRequestConverter } from "../util/reimburse-converter";
import { SqlReimburseRequest } from "../dto/sql-reimb-req";

/**
 * Retreive all requests from the database
 */
export async function findAll(): Promise<ReimbRequest[]> {
  const client = await connectionPool.connect();
  try {
    const res = await client.query(
      `SELECT ers_username, ers_users_id, reimb_id, reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_status, user_role, reimb_type
      FROM expense_reimbursement.ers_users 
      INNER JOIN expense_reimbursement.ers_reimbursement ON ers_reimbursement.reimb_author = ers_users.ers_users_id
      INNER JOIN expense_reimbursement.ers_reimbursement_status ON ers_reimbursement.reimb_status_id = ers_reimbursement_status.reimb_status_id
      INNER JOIN expense_reimbursement.ers_user_roles ON ers_reimbursement.reimb_resolver = ers_user_roles.ers_user_role_id
      INNER JOIN expense_reimbursement.ers_reimbursement_type ON ers_reimbursement.reimb_type_id = ers_reimbursement_type.reimb_type_id ORDER BY reimb_status`
    );
    return res.rows;
  } finally {
    client.release();
  }
}

/**
 * Retrieve a request by its id
 * @param id
 */
export async function findById(id: number): Promise<ReimbRequest> {
  const client = await connectionPool.connect();
  try {
    const res = await client.query(
      "SELECT * FROM expense_reimbursement.ers_reimbursement WHERE reimb_id = $1",
      [id]
    );
    let reimbursement: SqlReimburseRequest = res.rows[0];
    if (reimbursement !== undefined) {
      return reimburseRequestConverter(reimbursement);
    } else {
      return undefined;
    }
  } finally {
    client.release();
  }
}

/**
//  * Add a new reimbursement request to the DB
//  * @param reimbursement
//  */
export async function createReimbursement(reimbursement): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const res = await client.query(
      `INSERT INTO expense_reimbursement.ers_reimbursement
      (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_status_id, reimb_type_id )
      VALUES ($1, CURRENT_TIMESTAMP, $2, $3, 1, $4)
      RETURNING reimb_id`,
      [
        +reimbursement.amount,
        reimbursement.description,
        reimbursement.id,
        reimbursement.typeId
      ]
    );
    return res.rows[0].reimb_id;
  } finally {
    client.release();
  }
}

/**
 * Update a reimbursement request
 * @param id
 */
export async function updateRequest(
  reimbursement,
  id: number
): Promise<ReimbRequest> {
  const client = await connectionPool.connect();
  try {
    const res = await client.query(
      "UPDATE expense_reimbursement.ers_reimbursement SET reimb_resolver = 2, reimb_resolved = CURRENT_TIMESTAMP, reimb_status_id = $1 WHERE reimb_id = $2 RETURNING reimb_id",
      [reimbursement.statusId, id]
    );
    return res.rows[0].reimb_id;
  } finally {
    client.release();
  }
}
