import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../controllers/subCategoryCtrl.js";
const routes = express.Router();
routes.route("/").get(getAllSubCategory).post(createSubCategory);
routes
  .route("/:id")
  .delete(deleteSubCategory)
  .put(updateSubCategory)
  .get(getSubCategory);
export default routes;
