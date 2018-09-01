import { connectionPool } from "../util/connection.util";
import { ReimbRequest } from "../model/reimburserequest";
import { reimburseRequestConverter } from "../util/reimburse-converter";

/**
 * Retreive all movies from the database
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

// /**
//  * Retreive a movie by its id
//  * @param id
//  */
// export async function findById(id: number): Promise<Movie> {
//   const client = await connectionPool.connect();
//   try {
//     const res = await client.query('SELECT * FROM movies.movies WHERE movie_id = $1', [id]);
//     let movie: SqlMovie = res.rows[0];
//     if (movie !== undefined) {
//       return movieConverter(movie);
//     } else {
//       return undefined;
//     }
//   } finally {
//     client.release();
//   }
// }

/**
//  * Add a new reimbursement request to the DB
//  * @param reimbursement
//  */
// export async function createReimbursement(
//   reimbursement: ReimbRequest
// ): Promise<number> {
//   const client = await connectionPool.connect();
//   try {
//     const res = await client.query(
//       `INSERT INTO expense_reimbursement.ers_reimbursement
//       (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author, reimb_resolver, reimb_status_id, reimb_type_id )
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//         RETURNING reimb_id`,
//       [
//         reimbursement.amount,
//         reimbursement.submitted,
//         reimbursement.resolved,
//         reimbursement.description,
//         reimbursement.author,
//         reimbursement.resolver,
//         reimbursement.status,
//         reimbursement.type
//       ]
//     );
//     console.log(res);
//     return res.rows[0].reimb_id;
//   } finally {
//     client.release();
//   }
// }
