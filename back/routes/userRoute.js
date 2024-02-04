import {
  createUser,
  deleteUser,
  getAllUser,
  loginAdmin,
  loginToken,
  loginUser,
  updateUser,
} from "../controllers/userCtrl.js";
import express from "express";
import isLogin from "../utils/isLogin.js";
import isAdmin from "../utils/isAdmin.js";
const routes = express.Router();
routes.route("/").get(getAllUser).post(createUser);
routes.route("/login").post(loginUser);
routes.route("/admin").get(isAdmin,loginAdmin);
routes.route("/:id").put(updateUser).get(isLogin, loginToken).delete(deleteUser);
export default routes;
