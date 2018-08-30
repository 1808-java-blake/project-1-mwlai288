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
    // extract the users
    const users = [];
    resp.rows.forEach(user_result => {
      users.push(user_result);
    });
    return users;
  } finally {
    client.release();
  }
}

/**
 * Add a new user to the DB
 * @param user
 */
export async function createUser(user: User): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const res = await client.query(
      `INSERT INTO expense_reimbursement.ers_users
      (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING ers_users_id`,
      [
        user.username,
        user.password,
        user.first_name,
        user.last_name,
        user.email,
        user.role
      ]
    );
    return res.rows[0].ers_user_id;
  } finally {
    client.release();
  }
}
