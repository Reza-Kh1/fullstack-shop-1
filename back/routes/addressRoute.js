import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../controllers/addressCtrl.js";
import isLogin from "../utils/isLogin.js";
const routes = express.Router();
routes.route("/").post(isLogin, createAddress).get(isLogin,getAddress)
routes.route("/:id").put(isLogin,updateAddress).delete(isLogin,deleteAddress);
export default routes;
