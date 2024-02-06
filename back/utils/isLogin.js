import token from "jsonwebtoken";
import { customError } from "../middlewares/errorHandler.js";
import asyncHandler from "express-async-handler";
const isLogin = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  const cookie = req.cookies.user;

  if (!authorization && !cookie)
    throw customError("لطفا دوباره وارد حساب کاربری خود شوید", 400);
  try {
    if (authorization) {
      const verify = authorization.split(" ")[1];
      const userInfo = token.verify(verify, process.env.TOKEN_SECURET);
      res.userInfo = userInfo;
    } else {
      const userInfo = token.verify(cookie, process.env.TOKEN_SECURET);
      res.userInfo = userInfo;
    }
    next();
  } catch (err) {
    throw customError("لطفا دوباره وارد حساب کاربری خود شوید", 400);
  }
});
export default isLogin;