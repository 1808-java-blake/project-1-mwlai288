import { connectionPool } from "../util/connection.util";
import { userConverter } from "../util/user-converter";
import { User } from "../model/user";
import { reimburseRequestConverter } from "../util/reimburse-converter";
// import bcrypt = require("bcrypt");

/**
 * Retreive all users from the DB
 */
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM expense_reimbursement.ers_users`
    );
    // extract the users
    const users = [];
    res.rows.forEach(user_result => {
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
      VALUES ($1,$2,$3,$4,$5,2)
      RETURNING ers_users_id`,
      [
        user.username,
        user.password,
        user.first_name,
        user.last_name,
        user.email
      ]
    );
    return res.rows[0].ers_user_id;

    // bcrypt.genSalt(50, (err, salt)=> {
    //   bcrypt.hash(user.password, salt, (err, hash)=> {
    //     if (err) throw err;
    //       user.save().then(

    //       )
    // })
    // })
  } finally {
    client.release();
  }
}

/**
 * Add a reimbursement request to a users list
 * @param reimbursementId
 * @param userId
 */
export async function addReimbursementRequest(
  reimbursementId: number,
  userId: number
): Promise<any> {
  const client = await connectionPool.connect();
  try {
    const res = await client.query(
      `INSERT INTO expense_reimbursement.ers_reimbursement
        (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userId, reimbursementId]
    );
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by username and password, will also retreive all of that users movies
 * @param id
 */
export async function findByUsernameAndPassword(
  username: string,
  password: string
): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM expense_reimbursement.ers_users u
        WHERE u.ers_username = $1
        AND u.ers_password = $2`,
      [username, password]
    );
    if (res.rows.length !== 0) {
      return userConverter(res.rows[0]); // get the user data from first row
    }
    return null;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by id, will also retreive all of that users requests
 * @param id
 */
export async function findById(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM expense_reimbursement.ers_users u
      WHERE u.ers_users_id = $1`,
      [id]
    );

    const user = userConverter(res.rows[0]); // get the user data from first row
    // get the requests from all the rows
    console.log(user);
    res.rows.forEach(request => {
      request.reimb_id &&
        user.reimbursement.push(reimburseRequestConverter(request));
    });
    return user;
  } finally {
    client.release();
  }
}
