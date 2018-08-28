// import {connectionPool} from '../util/connection.util'

// /**
//  * Retreive all users from the DB along with all their movies
//  */
// export async function findAll(): Promise<User[]> {
//   const client = await connectionPool.connect();
//   try {
//     const resp = await client.query(
//       `SELECT * FROM movies.app_users
//         LEFT JOIN movies.users_movies
//         USING (user_id)
//         LEFT JOIN movies.movies
//         USING(movie_id)`);
