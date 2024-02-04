import token from "jsonwebtoken";
import { customError } from "../middlewares/errorHandler.js";
import asynchandler from "express-async-handler";
const isAdmin = asynchandler(async (req, res, next) => {
  try {
    const cookie = req.cookies.user;
    const info = token.verify(cookie, process.env.TOKEN_SECURET);
    if (info.role !== "ADMIN") throw new Error();
    res.userInfo = info;
    next();
  } catch (err) {
    throw customError("لطفا دوباره وارد حساب کاربری شوید", 403);
  }
});
export default isAdmin;
