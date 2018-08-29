import { connectionPool } from "../util/connection.util";
import { userConverter } from "../util/user-converter";
import { User } from "../model/user";

/**
 * Retreive all users from the DB
 */
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM expense_reimbursement.ers_users`
    );

    // extract the users and their movies from the result set
    const users = [];
    resp.rows.forEach(user_result => {
      users.push(user_result);
    });
    return users;
  } finally {
    client.release();
  }
}
