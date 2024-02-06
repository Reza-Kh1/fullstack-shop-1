import {
  createUser,
  deleteUser,
  getAllUser,
  getProfile,
  loginAdmin,
  loginToken,
  loginUser,
  updateUser,
} from "../controllers/userCtrl.js";
import express from "express";
import isLogin from "../utils/isLogin.js";
import isAdmin from "../utils/isAdmin.js";
import isAuthor from "../utils/isAuthor.js";
const routes = express.Router();
routes.route("/").get(isAdmin, getAllUser).post(createUser);
routes.route("/login").post(loginUser);
routes.route("/admin").get(isAuthor, loginAdmin);
routes.route("/profile").get(isLogin, getProfile);
routes.route("/:id").put(isLogin, updateUser).get(isLogin, loginToken).delete(isAdmin, deleteUser);
export default routes;
