import express from "express"
import isLogin from "../utils/isLogin"
const routes = express.Router()
routes.route("/").post(isLogin).get()
export default routes