import express from "express";
import isLogin from "../utils/isLogin.js";
import isAdmin from "../utils/isAdmin.js";
import {
  createMessasge,
  getAllMessasgeAmin,
  getAllMessasge,
  getMessage,
  replyMessage,
} from "../controllers/messageCtrl.js";
const routes = express.Router();
routes.route("/").post(isLogin, createMessasge).get(isLogin, getAllMessasge);
routes.route("/admin").get(isAdmin, getAllMessasgeAmin);
routes
  .route("/:id")
  .get(isLogin, getMessage)
  .post(isAdmin, replyMessage)
export default routes;
