import express from "express";
import { createCart, deleteCart, updateCart } from "../controllers/cartCtrl.js";
const routes = express.Router();
routes.route("/:id").post(createCart).delete(deleteCart).put(updateCart);
export default routes;
