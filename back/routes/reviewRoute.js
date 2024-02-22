import express from "express";
import {
  createReview,
  createReplyReview,
  deleteReview,
  getAllReviewAdmin,
  getReplyReview,
  updateReview,
  getAllReview,
} from "../controllers/reviewCtrl.js";
import isAuthor from "../utils/isAuthor.js";
const routes = express.Router();
routes.route("/").get(getAllReview).post(createReview);
routes.route("/admin").get(isAuthor, getAllReviewAdmin);
routes
  .route("/:id")
  .get(getReplyReview)
  .post(isAuthor, createReplyReview)
  .put(isAuthor, updateReview)
  .delete(isAuthor, deleteReview);
export default routes;