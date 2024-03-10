import express from "express";
import isLogin from "../utils/isLogin.js";
import { createInterest, deleteInterest } from "../controllers/interestCtrl.js";
const routes = express.Router();
routes
  .route("/:id")
  .get(isLogin, createInterest)
  .delete(isLogin, deleteInterest);
export default routes;
