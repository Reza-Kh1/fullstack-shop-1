import express from "express";
import {
  createDetail,
  createProduct,
  deleteProduct,
  getAllProduct,
  getAllProductAdmin,
  getProduct,
  getProductAdmin,
  updateDetail,
  updateProduct,
} from "../controllers/productCtrl.js";
import isAdmin from "../utils/isAdmin.js";
const routes = express.Router();
routes.route("/").post(isAdmin, createProduct).get(getAllProduct);
routes.route("/admin").get(getAllProductAdmin);
routes.route("/admin/:id").get(getProductAdmin);
routes.route("/detail-product/:id").post(createDetail).put(updateDetail);
routes.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);
export default routes;
