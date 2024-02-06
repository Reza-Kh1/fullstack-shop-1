import express from "express";
import { createCart, deleteCart, updateCart } from "../controllers/cartCtrl.js";
import isLogin from "../utils/isLogin.js";
const routes = express.Router();
routes
  .route("/:id")
  .post(isLogin, createCart)
  .delete(isLogin, deleteCart)
  .put(isLogin, updateCart);
export default routes;
