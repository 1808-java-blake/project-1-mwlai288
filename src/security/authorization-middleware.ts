export function authMiddleware(...role: number[]) {
  return (req, resp, next) => {
    // console.log(req.session);
    console.log(role);
    const user = req.session.role;
    console.log(user);
    if (!user) {
      resp.sendStatus(401);
      return;
    }
    const hasPermission = role.some(role => {
      if (user.role === role) {
        return true;
      } else {
        return false;
      }
    });
    if (hasPermission) {
      next();
    } else {
      resp.sendStatus(403);
    }
  };
}
