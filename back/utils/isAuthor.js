import token from "jsonwebtoken";
import { customError } from "../middlewares/errorHandler.js";
import asynchandler from "express-async-handler";
const isAuthor = asynchandler(async (req, res, next) => {
    try {

        const cookie = req.cookies.user;
        const userInfo = token.verify(cookie, process.env.TOKEN_SECURET);
        if (userInfo.role === "ADMIN" || userInfo.role === "AUTHOR") {
            res.userInfo = userInfo;
            next();
        } else {
            throw new Error();
        }
    } catch (err) {
        throw customError("لطفا دوباره وارد حساب کاربری شوید", 403);
    }
});
export default isAuthor;
