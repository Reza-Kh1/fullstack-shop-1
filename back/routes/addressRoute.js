import express from "express";
import {
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../controllers/addressCtrl.js";
const routes = express.Router();
routes.route("/").post(createAddress);
routes.route("/:id").get(getAddress).put(updateAddress).delete(deleteAddress);
export default routes;
