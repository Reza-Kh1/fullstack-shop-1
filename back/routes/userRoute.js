import {
  createUser,
  deleteUser,
  getAllUser,
  getProfile,
  loginAdmin,
  loginUser,
  searchUser,
  logOut,
  updateUser,
  verifyPassword,
} from "../controllers/userCtrl.js";
import express from "express";
import isLogin from "../utils/isLogin.js";
import isAdmin from "../utils/isAdmin.js";
import isAuthor from "../utils/isAuthor.js";
const routes = express.Router();
routes.route("/").get(isAdmin, getAllUser).post(createUser);
routes.route("/login").post(loginUser);
routes.route("/verify").post(verifyPassword);
routes.route("/admin").get(isAuthor, loginAdmin);
routes.route("/profile").get(isLogin, getProfile);
routes.route("/logout").get(logOut)
routes
  .route("/:id")
  .put(isLogin, updateUser)
  .delete(isAdmin, deleteUser)
  .get(isAdmin, searchUser);
export default routes;
