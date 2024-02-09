import express from "express";
import {
  createDetail,
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getProductAdmin,
  updateDetail,
  updateProduct,
} from "../controllers/productCtrl.js";
import isAdmin from "../utils/isAdmin.js";
import isAuthor from "../utils/isAuthor.js";
const routes = express.Router();
routes.route("/").post(isAuthor, createProduct).get(getAllProduct);
routes.route("/admin/:id").get(isAuthor,getProductAdmin);
routes.route("/detail/:id").post(isAuthor,createDetail).put(isAuthor,updateDetail);
routes.route("/:id").get(getProduct).delete(isAuthor,deleteProduct).put(isAuthor,updateProduct);
export default routes;