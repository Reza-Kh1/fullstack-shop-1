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
routes.route("/").get(isAdmin,getAllOff).post(isAdmin,createOff);
routes.route("/:id").get(getOff).delete(isAdmin,deleteOff).put(isAdmin,updateOff);
export default routes;
