import { User } from "../model/user";
import { SqlUser } from "../dto/sql-user";

/**
 * This is used to convert a sql movie into an actual movie
 */
export function userConverter(user: SqlUser) {
  return new User(
    user.ers_users_id,
    user.ers_username,
    user.ers_password,
    user.user_first_name,
    user.user_last_name,
    user.user_email,
    user.user_role
  );
}
