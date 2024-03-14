import express from "express";
import { createColor, deleteColor, updateColor } from "../controllers/colorCtrl.js";
import isAuthor from "../utils/isAuthor.js";
const routes = express.Router()
routes.route("/").post(isAuthor, createColor)
routes.route("/:id").delete(isAuthor, deleteColor).put(isAuthor, updateColor)
export default routes