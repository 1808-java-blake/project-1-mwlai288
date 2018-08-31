import { User } from "../model/user";
import { SqlUser } from "../dto/sql-user";

/**
 * This is used to convert a sql users into an actual user
 */
export function userConverter(user: SqlUser) {
  return new User(
    user.id,
    user.username,
    user.password,
    user.first_name,
    user.last_name,
    user.email,
    user.role
  );
}
