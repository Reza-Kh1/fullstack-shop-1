import express from "express";
import {
  createPayment,
  deletePayment,
  getAllPayment,
  getPayment,
  updatePayment,
} from "../controllers/payment.js";
const routes = express.Router();
routes.route("/").get(getAllPayment).post(createPayment);
routes.route("/:id").put(updatePayment).delete(deletePayment);
routes.route("/user").get(getPayment);
export default routes;
