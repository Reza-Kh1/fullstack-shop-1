import token from "jsonwebtoken";
import asynchandler from "express-async-handler";
const isAdmin = asynchandler(async (req, res, next) => {
  try {
    const cookie = req.cookies.user;
    const userInfo = token.verify(cookie, process.env.TOKEN_SECURET);
    if (userInfo.role !== "ADMIN") throw new Error();
    res.userInfo = userInfo;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(403).send("دوباره وارد حساب کاربری خود بشوید")
    } else {
      res.status(403).send("مجاز به انجام عملیات نیستید")
    }
  }
});
export default isAdmin;
