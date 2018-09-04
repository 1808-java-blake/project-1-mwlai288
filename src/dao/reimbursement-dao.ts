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
      "SELECT * FROM expense_reimbursement.ers_reimbursement"
    );
    return res.rows.map(reimburseRequestConverter);
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
export async function createReimbursement(reimbursement, id): Promise<number> {
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
      "UPDATE expense_reimbursement.ers_reimbursement SET reimb_resolver = $1, reimb_status_id = $2 WHERE reimb_id = $3 RETURNING reimb_id",
      [reimbursement.resolverId, reimbursement.statusId, id]
    );
    return res.rows[0].reimb_id;
  } finally {
    client.release();
  }
}
