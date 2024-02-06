import express from "express";
import {
  createOff,
  deleteOff,
  getAllOff,
  getOff,
  updateOff,
} from "../controllers/offCtrl.js";
import isAdmin from "../utils/isAdmin.js";
const routes = express.Router();
routes.route("/").get(getAllOff).post(isAdmin,createOff);
routes.route("/:id").get(getOff).delete(deleteOff).put(updateOff);
export default routes;
