import express from "express"
import isLogin from "../utils/isLogin.js"
import isAdmin from "../utils/isAdmin.js"
import { createMessasge, getAllMessasgeAmin, getAllMessasge, getMessage, replyMessage, updateMessage } from "../controllers/messageCtrl.js"
const routes = express.Router()
routes.route("/").post(isLogin, createMessasge).get(isLogin, getAllMessasge)
routes.route("/:id").get(isLogin, getMessage).post(isAdmin, replyMessage).put(isAdmin, updateMessage)
routes.route("/admin").get(isAdmin, getAllMessasgeAmin)
export default routes