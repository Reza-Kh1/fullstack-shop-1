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
const routes = express.Router();
routes.route("/").get(getAllReview).post(createReview);
routes.route("/admin").get(getAllReviewAdmin)
routes
  .route("/:id")
  .get(getReplyReview)
  .post(createReplyReview)
  .put(updateReview)
  .delete(deleteReview);
export default routes;