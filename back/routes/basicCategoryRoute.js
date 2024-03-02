import express from "express";
import {
  createBasicCategory,
  deleteBasicCategory,
  getBasicCategory,
  updateBasicCategory,
} from "../controllers/basicCategoryCtrl.js";
import isAuthor from "../utils/isAuthor.js";
const routes = express.Router();
routes.route("/").get(getBasicCategory).post(isAuthor, createBasicCategory);
routes
  .route("/:id")
  .put(isAuthor, updateBasicCategory)
  .delete(isAuthor, deleteBasicCategory);
export default routes;
